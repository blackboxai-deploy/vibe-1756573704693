import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let db: Database | null = null

export async function getDatabase() {
  if (!db) {
    db = await open({
      filename: './freshmart.db',
      driver: sqlite3.Database,
    })
    
    // Initialize tables
    await initializeTables()
    await seedDatabase()
  }
  return db
}

async function initializeTables() {
  if (!db) return
  
  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      preferences TEXT DEFAULT '{}'
    )
  `)
  
  // Products table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      typical_duration_days INTEGER NOT NULL,
      unit TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image_url TEXT
    )
  `)
  
  // Orders table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER DEFAULT 1,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      order_date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `)
  
  // Predictions table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER DEFAULT 1,
      product_id INTEGER NOT NULL,
      predicted_depletion_date DATE NOT NULL,
      confidence_score DECIMAL(3,2) NOT NULL,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `)
}

async function seedDatabase() {
  if (!db) return
  
  // Check if data already exists
  const userCount = await db.get('SELECT COUNT(*) as count FROM users')
  if (userCount.count > 0) return
  
  // Add demo user
  await db.run(`
    INSERT INTO users (name, email, preferences) VALUES 
    ('Demo User', 'demo@freshmart.com', '{"notifications": true, "reminderDays": 2}')
  `)
  
  // Add products
  const products = [
    // Dairy & Eggs
    { name: 'Whole Milk (1L)', category: 'Dairy & Eggs', duration: 7, unit: 'bottle', price: 3.49, image: 'https://placehold.co/300x300?text=Fresh+whole+milk+bottle+in+refrigerator' },
    { name: 'Large Eggs (12 pack)', category: 'Dairy & Eggs', duration: 21, unit: 'dozen', price: 4.99, image: 'https://placehold.co/300x300?text=Farm+fresh+eggs+carton+brown+white' },
    { name: 'Greek Yogurt (500g)', category: 'Dairy & Eggs', duration: 10, unit: 'container', price: 5.49, image: 'https://placehold.co/300x300?text=Creamy+Greek+yogurt+organic+container' },
    { name: 'Cheddar Cheese (200g)', category: 'Dairy & Eggs', duration: 28, unit: 'block', price: 6.99, image: 'https://placehold.co/300x300?text=Sharp+cheddar+cheese+block+aged' },
    { name: 'Butter (250g)', category: 'Dairy & Eggs', duration: 35, unit: 'block', price: 4.49, image: 'https://placehold.co/300x300?text=Creamy+butter+stick+fresh+dairy' },
    
    // Fresh Produce
    { name: 'Bananas (1kg)', category: 'Fresh Produce', duration: 5, unit: 'bunch', price: 2.99, image: 'https://placehold.co/300x300?text=Ripe+yellow+bananas+bunch+organic' },
    { name: 'Apples (1kg)', category: 'Fresh Produce', duration: 14, unit: 'bag', price: 4.99, image: 'https://placehold.co/300x300?text=Red+crispy+apples+fresh+harvest' },
    { name: 'Carrots (1kg)', category: 'Fresh Produce', duration: 21, unit: 'bag', price: 2.49, image: 'https://placehold.co/300x300?text=Fresh+orange+carrots+organic+crunchy' },
    { name: 'Spinach (300g)', category: 'Fresh Produce', duration: 7, unit: 'bag', price: 3.99, image: 'https://placehold.co/300x300?text=Fresh+green+spinach+leaves+organic' },
    { name: 'Tomatoes (500g)', category: 'Fresh Produce', duration: 7, unit: 'pack', price: 4.49, image: 'https://placehold.co/300x300?text=Ripe+red+tomatoes+vine+fresh' },
    
    // Pantry Staples
    { name: 'White Rice (2kg)', category: 'Pantry Staples', duration: 90, unit: 'bag', price: 8.99, image: 'https://placehold.co/300x300?text=Long+grain+white+rice+premium+quality' },
    { name: 'Pasta (500g)', category: 'Pantry Staples', duration: 45, unit: 'box', price: 2.99, image: 'https://placehold.co/300x300?text=Italian+pasta+spaghetti+durum+wheat' },
    { name: 'Olive Oil (500ml)', category: 'Pantry Staples', duration: 60, unit: 'bottle', price: 12.99, image: 'https://placehold.co/300x300?text=Extra+virgin+olive+oil+premium+bottle' },
    { name: 'Sea Salt (1kg)', category: 'Pantry Staples', duration: 180, unit: 'container', price: 3.49, image: 'https://placehold.co/300x300?text=Natural+sea+salt+crystals+pure' },
    { name: 'Black Pepper (100g)', category: 'Pantry Staples', duration: 120, unit: 'grinder', price: 4.99, image: 'https://placehold.co/300x300?text=Whole+black+peppercorns+spice+grinder' },
    
    // Beverages
    { name: 'Coffee Beans (1kg)', category: 'Beverages', duration: 30, unit: 'bag', price: 18.99, image: 'https://placehold.co/300x300?text=Premium+coffee+beans+dark+roast' },
    { name: 'Green Tea (20 bags)', category: 'Beverages', duration: 45, unit: 'box', price: 6.49, image: 'https://placehold.co/300x300?text=Organic+green+tea+bags+premium+blend' },
    { name: 'Orange Juice (1L)', category: 'Beverages', duration: 7, unit: 'carton', price: 4.99, image: 'https://placehold.co/300x300?text=Fresh+orange+juice+pulp+free+vitamin' },
    
    // Frozen Foods
    { name: 'Frozen Berries (500g)', category: 'Frozen Foods', duration: 90, unit: 'bag', price: 8.99, image: 'https://placehold.co/300x300?text=Mixed+frozen+berries+antioxidant+rich' },
    { name: 'Frozen Vegetables (1kg)', category: 'Frozen Foods', duration: 120, unit: 'bag', price: 6.49, image: 'https://placehold.co/300x300?text=Frozen+mixed+vegetables+broccoli+carrots' },
    
    // Household Essentials
    { name: 'Toilet Paper (12 rolls)', category: 'Household', duration: 30, unit: 'pack', price: 14.99, image: 'https://placehold.co/300x300?text=Soft+toilet+paper+rolls+premium+quality' },
    { name: 'Dish Soap (500ml)', category: 'Household', duration: 45, unit: 'bottle', price: 3.99, image: 'https://placehold.co/300x300?text=Dish+soap+antibacterial+lemon+scent' },
    { name: 'Laundry Detergent (2L)', category: 'Household', duration: 60, unit: 'bottle', price: 12.99, image: 'https://placehold.co/300x300?text=Liquid+laundry+detergent+fresh+clean' }
  ]
  
  for (const product of products) {
    await db.run(`
      INSERT INTO products (name, category, typical_duration_days, unit, price, image_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [product.name, product.category, product.duration, product.unit, product.price, product.image])
  }
  
  // Generate realistic order history (last 120 days)
  const today = new Date()
  const products_result = await db.all('SELECT * FROM products')
  
  for (const product of products_result) {
    // Generate 2-5 orders per product over the last 120 days
    const orderCount = Math.floor(Math.random() * 4) + 2
    const cycleLength = product.typical_duration_days
    
    for (let i = 0; i < orderCount; i++) {
      const daysAgo = (orderCount - i) * cycleLength + Math.floor(Math.random() * 7) - 3
      const orderDate = new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      const quantity = Math.floor(Math.random() * 3) + 1
      
      await db.run(`
        INSERT INTO orders (user_id, product_id, quantity, order_date) 
        VALUES (1, ?, ?, ?)
      `, [product.id, quantity, orderDate.toISOString().split('T')[0]])
    }
  }
}

export interface Product {
  id: number
  name: string
  category: string
  typical_duration_days: number
  unit: string
  price: number
  image_url?: string
}

export interface Order {
  id: number
  user_id: number
  product_id: number
  quantity: number
  order_date: string
}

export interface Prediction {
  id: number
  user_id: number
  product_id: number
  predicted_depletion_date: string
  confidence_score: number
  status: string
  created_at: string
}