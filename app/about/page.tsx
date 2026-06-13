'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Globe, Wrench, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { tools } from '@/lib/tools-data';
import { toast } from 'sonner';

const stats = [
  { icon: Wrench, value: tools.length.toString(), label: 'Tools Available' },
  { icon: Users, value: '50K+', label: 'Developers Helped' },
  { icon: Globe, value: '120+', label: 'Countries Reached' },
];

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    toolIdea: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (in production, this would send to a backend)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    toast.success('Thank you for your suggestion!');
    setFormData({ name: '', email: '', toolIdea: '' });
    setIsSubmitting(false);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Built for developers, by a developer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            DevToolbox was created out of frustration with slow, ad-riddled tools.
            We believe developers deserve better — fast, clean, privacy-focused utilities.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Every day, developers waste time on repetitive tasks — formatting JSON,
              generating CSS, looking up git commands. We&apos;ve been there, and we decided to do something about it.
            </p>
            <p>
              DevToolbox provides a curated collection of tools that run entirely in your browser.
              No data is sent to any server. No accounts. No tracking. Just tools that work.
            </p>
            <p>
              We&apos;re committed to keeping DevToolbox free and open. If you have ideas for new tools,
              we&apos;d love to hear from you.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-xl bg-card border border-border"
            >
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Suggest a Tool */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Suggest a Tool</h2>
          <p className="text-muted-foreground mb-6">
            Have an idea for a tool that would make your life easier? Let us know!
            We&apos;re always looking for suggestions from the community.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-green-500 mb-2">Thank You!</h3>
              <p className="text-muted-foreground">Your suggestion has been submitted. We&apos;ll review it soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toolIdea">Tool Idea</Label>
                <Textarea
                  id="toolIdea"
                  value={formData.toolIdea}
                  onChange={(e) => setFormData({ ...formData, toolIdea: e.target.value })}
                  placeholder="Describe the tool you'd like to see..."
                  className="min-h-[120px] resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suggestion
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
