"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Define the Project type
export type Project = {
  id: string
  title: string
  description: string
  category: string
  image: string
  github?: string
  demo?: string
  createdAt: string
}

// Function to ensure directory exists
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Function to save base64 image to file
async function saveBase64Image(base64Data: string, filePath: string) {
  // Remove the data:image/jpeg;base64, part
  const base64Image = base64Data.split(";base64,").pop() || ""

  // Create buffer from base64
  const imageBuffer = Buffer.from(base64Image, "base64")

  // Ensure directory exists
  const dir = path.dirname(filePath)
  ensureDirectoryExists(dir)

  // Write file
  fs.writeFileSync(filePath, imageBuffer)
}

export async function uploadProject(formData: FormData) {
  try {
    // Get data from form
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const github = formData.get("github") as string
    const demo = formData.get("demo") as string
    const imageBase64 = formData.get("imageBase64") as string

    if (!title || !description || !category || !imageBase64) {
      throw new Error("Missing required fields")
    }

    // Generate a unique ID
    const id = Date.now().toString()

    // Define image path
    const imageFileName = `${id}.jpg`
    const imagePath = path.join(process.cwd(), "public", "projects", imageFileName)
    const publicImagePath = `/projects/${imageFileName}`

    // Save the image
    await saveBase64Image(imageBase64, imagePath)

    // Create a new project object
    const newProject: Project = {
      id,
      title,
      description,
      category,
      image: publicImagePath,
      github: github || undefined,
      demo: demo || undefined,
      createdAt: new Date().toISOString(),
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), "public", "data")
    ensureDirectoryExists(dataDir)

    const projectsFile = path.join(dataDir, "projects.json")

    // Read existing projects or create an empty array
    let projects: Project[] = []
    if (fs.existsSync(projectsFile)) {
      const data = fs.readFileSync(projectsFile, "utf8")
      try {
        projects = JSON.parse(data)
      } catch (e) {
        // If JSON parsing fails, start with an empty array
        projects = []
      }
    }

    // Add the new project
    projects.push(newProject)

    // Write back to the file
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2))

    // Revalidate the path to update the UI
    revalidatePath("/")

    // Redirect back to home page
    redirect("/")
  } catch (error) {
    console.error("Error uploading project:", error)
    throw error
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsFile = path.join(process.cwd(), "public", "data", "projects.json")

    if (!fs.existsSync(projectsFile)) {
      return []
    }

    const data = fs.readFileSync(projectsFile, "utf8")
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error("Error parsing projects JSON:", e)
      return []
    }
  } catch (error) {
    console.error("Error getting projects:", error)
    return []
  }
}
