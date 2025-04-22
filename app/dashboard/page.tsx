"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadProject } from "@/app/actions"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    setError(null)

    try {
      // Add the base64 image to the form data
      if (preview) {
        formData.append("imageBase64", preview)
      } else {
        throw new Error("Please select an image")
      }

      await uploadProject(formData)
    } catch (error) {
      console.error("Error uploading project:", error)
      setError(
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "Failed to upload project",
      )
      setIsUploading(false)
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="/">Gouri Shankar</Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container py-10">
        <div className="mb-8 flex items-center gap-2">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Upload a new project to showcase on your portfolio website.</CardDescription>
          </CardHeader>
          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-destructive/20 text-destructive p-3 rounded-md text-sm">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" placeholder="Enter project title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe your project" rows={4} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue="robotics">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="robotics">Robotics</SelectItem>
                      <SelectItem value="iot">IoT</SelectItem>
                      <SelectItem value="ros2">ROS2</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" name="github" placeholder="https://github.com/username/repo" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo">Live Demo URL (if available)</Label>
                <Input id="demo" name="demo" placeholder="https://your-demo-url.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required />

                {preview && (
                  <div className="mt-2 relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                    <Image src={preview || "/placeholder.svg"} alt="Image preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Project
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
