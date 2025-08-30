'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="text-2xl font-bold text-white">FreshMart</span>
            </div>
            <Button 
              onClick={() => router.push('/dashboard')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6 bg-green-500/10 text-green-400 border-green-500/20">
          AI-Powered Smart Assistant
        </Badge>
        
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Never Run Out
          <span className="text-green-400 block">Again.</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          FreshMart's intelligent reorder assistant predicts when you'll run out of essentials, 
          sends timely reminders, and lets you restock with just one click. Say goodbye to empty fridges and last-minute grocery runs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            onClick={() => router.push('/dashboard')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
          >
            Try the Demo
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
          >
            Watch Demo Video
          </Button>
        </div>
      </section>

      {/* Problem & Solution Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Problem */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-red-400">The Problem</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Online grocery shoppers face frustrating challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Frequently forget to reorder essentials until they run out</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Last-minute shopping leads to higher costs and stress</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">No intelligent system to predict consumption patterns</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Leads to customer frustration and lost revenue for platforms</p>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">Our Solution</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                AI-powered intelligence meets seamless user experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Predicts when you'll run out based on consumption patterns</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Smart, timely reminders that aren't spammy or annoying</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">One-click reordering with personalized basket suggestions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-300">Continuous learning from your shopping behavior</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800 border-slate-700 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">🧠</span>
              </div>
              <CardTitle className="text-xl text-white">Smart Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                AI analyzes your consumption patterns to predict exactly when you'll run out of each item.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">🔔</span>
              </div>
              <CardTitle className="text-xl text-white">Intelligent Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Get perfectly timed notifications that help you restock before you run out.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">🛒</span>
              </div>
              <CardTitle className="text-xl text-white">One-Click Reorder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Restock your essentials instantly with personalized basket suggestions and one-click checkout.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Never Run Out Again?
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Join thousands of users who've eliminated grocery stress with FreshMart's intelligent reorder assistant.
        </p>
        <Button 
          size="lg"
          onClick={() => router.push('/dashboard')}
          className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-xl"
        >
          Start Your Demo
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">FM</span>
            </div>
            <span className="text-slate-400">FreshMart - Never Run Out Again</span>
          </div>
        </div>
      </footer>
    </div>
  )
}