import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getProjects } from "./actions"
import fs from "fs"
import path from "path"

// Ensure projects directory exists
function ensureDirectoryExists() {
  const projectsDir = path.join(process.cwd(), "public", "projects")
  const dataDir = path.join(process.cwd(), "public", "data")

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true })
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const projectsFile = path.join(dataDir, "projects.json")
  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, "[]")
  }
}

export default async function Home() {
  // Ensure directories exist
  ensureDirectoryExists()

  // Get projects
  const projects = await getProjects()

  // Sample projects if none are uploaded yet
  const sampleProjects = [
    {
      id: "1",
      title: "Strider_Bot",
      description: "ROS2-based mobile robot capable of autonomous navigation system with obstacle avoidance and path planning.",
      category: "robotics",
      image: "/Gazebo.png",
      github: "https://github.com/Gouri-Shankar-85/strider_bot",
      demo: "https://demo.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Snaptron",
      description: "Pick and Place robotic arm using ROS2",
      category: "robotics",
      image: "/CAD_model.png",
      github: "https://github.com/Gouri-Shankar-85/Snaptron",
      demo: "https://demo.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Vaccum Cleaning Robot",
      description: "Smart vaccum cleaner robot developed for indoor cleaning",
      category: "robotics",
      image: "/cad_model_vaccum.png",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Fixed Wing UAV",
      description: "Dual motor fixed wign UAV for the Drone Design Challenge",
      category: "CAD",
      image: "/cad_model.png",
      createdAt: new Date().toISOString(),
    },
  ]

  // Use uploaded projects or sample projects if none exist
  const displayProjects = projects.length > 0 ? projects : sampleProjects

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="/">Gouri Shankar</Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-950 hover:text-teal-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-teal-950 text-teal-400 hover:bg-teal-900 dark:bg-teal-950 dark:text-teal-400">
                Welcome to my portfolio
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm <span className="text-teal-500">Gouri Shankar</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                A passionate robotics and IoT developer specializing in ROS2 and embedded systems.
              </p>
              <div className="flex gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-border hover:bg-accent">
                  <a href="/Resume.pdf" download>
                    Download Resume
                  </a>
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="https://github.com/Gouri-Shankar-85" target="_blank" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gouri-shankar-s-s-629748257/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="mailto:sskzm5585@gmail.com" className="text-muted-foreground hover:text-foreground">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-purple-700 opacity-20 blur-3xl"></div>
              <div className="relative h-full w-full rounded-full border-2 border-border overflow-hidden">
                <Image
                  src="/profile_photo.jpg"
                  alt="Gouri Shankar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-950 text-teal-400 hover:bg-teal-900 dark:bg-teal-950 dark:text-teal-400">
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Background</h2>
              <div className="w-20 h-1 bg-teal-500 mb-6"></div>
              <p className="max-w-2xl text-muted-foreground">
                I'm a dedicated robotics and IoT developer with expertise in ROS2 and embedded systems. My passion lies
                in creating innovative solutions that bridge the gap between hardware and software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-teal-400">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Electrical and Electronics Engineering</h3>
                    <p className="text-sm text-muted-foreground">APJ Abdul Kalam Technological University, 2022-2026</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">High School</h3>
                    <p className="text-sm text-muted-foreground">Sainik School Kazhakootam, 2019-2021</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-teal-400">Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Manufacturing Head</h3>
                    <p className="text-sm text-muted-foreground">Vaccum Cleaner Robot, 2024</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Project Committee </h3>
                    <p className="text-sm text-muted-foreground">IEEE MACE SB, 2023-2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-teal-400">Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Robotics</h3>
                    <p className="text-sm text-muted-foreground">ROS2 based hobby projects</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">CAD modelling</h3>
                    <p className="text-sm text-muted-foreground">Developing custom based innovative designs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-950 text-teal-400 hover:bg-teal-900 dark:bg-teal-950 dark:text-teal-400">
                My Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-teal-500 mb-6"></div>
              <p className="max-w-2xl text-muted-foreground">
                Here are some of my recent projects in robotics, IoT, and ROS2 development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project) => (
                <Card key={project.id} className="bg-card border-border overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={`
                        ${project.category === "robotics" ? "bg-purple-600" : ""}
                        ${project.category === "iot" ? "bg-blue-600" : ""}
                        ${project.category === "ros2" ? "bg-teal-600" : ""}
                      `}
                      >
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </a>
                    )}
                    {project.demo && (
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
                    {!project.github && !project.demo && (
                      <div className="text-sm text-muted-foreground">https://go.screenpal.com/watch/cT1XjhnX2dt</div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/dashboard">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Project
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-950 text-teal-400 hover:bg-teal-900 dark:bg-teal-950 dark:text-teal-400">
                My Expertise
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <div className="w-20 h-1 bg-teal-500 mb-6"></div>
              <p className="max-w-2xl text-muted-foreground">
                I've worked with a variety of technologies in robotics, IoT, and embedded systems development.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "ROS2",
                "Python",
                "Embedded Systems",
                "Raspberry Pi",
                "Gazebo Simulation",
                "Autonomous Navigation",
                "IoT Protocols",
                "SLAM",
                "Solidworks",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:border-teal-500 transition-colors"
                >
                  <p className="font-medium">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4 px-3 py-1 text-sm bg-teal-950 text-teal-400 hover:bg-teal-900 dark:bg-teal-950 dark:text-teal-400">
                Get In Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
              <div className="w-20 h-1 bg-teal-500 mb-6"></div>
              <p className="max-w-2xl text-muted-foreground">
                Feel free to reach out if you're looking for a robotics or IoT developer, have a question, or just want
                to connect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-teal-400">Send Me a Message</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  <p className="text-muted-foreground">Feel free to reach out through any of these channels.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-900/30 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">sskzm5585@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-teal-900/30 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-muted-foreground">https://www.linkedin.com/in/gouri-shankar-s-s-629748257/</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-teal-900/30 p-3 rounded-full">
                      <Github className="h-6 w-6 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-muted-foreground">https://github.com/Gouri-Shankar-85</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    variant="outline"
                    className="border-teal-500 text-teal-500 hover:bg-teal-950 hover:text-teal-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© {new Date().getFullYear()} Gouri Shankar. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
