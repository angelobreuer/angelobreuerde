import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Component, ReactNode, useState } from 'react'

const WaveSvgHeight = 260

interface ProjectProps {
  stargazers: number,
  forks: number,
  language: {
    name: string,
    color: string,
  }
}

class ProjectDataFetcher {
  private value: { [key: string]: ProjectProps } | undefined | null;
  private subscribers: (() => void)[] = []

  fetch(projectName: string, callback: (props: ProjectProps) => void) {
    const wrapper = () => {
      const props = this.value![projectName]

      if (props) {
        callback(props)
      }
    }

    if (!this.value) {
      this.subscribers.push(wrapper)

      if (this.value === undefined) {
        this.fetchCore()
      }

    } else {
      wrapper()
    }
  }

  private async fetchCore() {
    this.value = null

    const response = await fetch("https://api.angelobreuer.de/")
    this.value = await response.json()

    if (this.subscribers && this.subscribers.length > 0) {
      this.subscribers.forEach(x => x())
      this.subscribers = []
    }
  }
}

const projectDataFetcher = new ProjectDataFetcher()

const ProjectStatsView = ({ name }: { name: string }) => {
  const [state, setState] = useState<ProjectProps | undefined>()

  if (!state) {
    projectDataFetcher.fetch(name, setState)
    return <></>
  }

  return <div>
    <div className='flex space-x-4'>
      <div className='flex space-x-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-yellow-400" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>

        <span>{state.stargazers}</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <p className='hidden'>Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6 p-1 fill-white">
          <path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z" />
        </svg>

        <span>{state.forks}</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <div className='h-2 w-2 m-1 rounded-3xl' style={{ backgroundColor: state.language.color }} />
        <span>{state.language.name}</span>
      </div>
    </div>
  </div>
}

class Cursor extends Component<{}, { blink: boolean }> {
  timeout?: NodeJS.Timeout

  constructor(props: {}) {
    super(props)
    this.state = { blink: true }
  }

  render(): ReactNode {
    return <div
      className='rounded-lg bg-white h-5 -mb-1 inline-block'
      style={{ width: '2px', opacity: this.state.blink ? 0 : 1 }} />
  }

  componentDidMount() {
    this.timeout = setInterval(() => this.setState({ blink: !this.state.blink }), 500);
  }

  componentWillUnmount() {
    if (!this.timeout) {
      clearInterval(this.timeout)
      this.timeout = undefined
    }
  }
}

const GitHubPresenter = () => {
  return <div
    className="rounded-lg border absolute right-4 top-20 px-8 py-4 border-gray-700 flex space-x-3 hover:border-indigo-700 transition-colors cursor-pointer"
    onClick={() => { window.open("https://github.com/angelobreuer", "_blank") }}>

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#fff" />
    </svg>

    <p>Checkout my GitHub!</p>
  </div>
}

const Navbar = () => {
  return <nav className='flex lg:px-24 px-8 py-4 m-0 shadow-lg border-b border-gray-700 w-full' style={{ backgroundColor: '#131313' }}>
    <div id='brand' className='uppercase font-bold'>Angelo Breuer</div>

    <ul className='list-none flex lg:space-x-12 space-x-4 ml-auto'>
      <li className='block'><Link href="#home">Home</Link></li>
      <li className='block'><Link href="#about">About</Link></li>
      <li className='block'><Link href="#projects">Projects</Link></li>
    </ul>
  </nav>
}

const Landing = () => {
  return <main
    className="flex justify-center flex-col relative"
    id="home"
    style={{ height: `calc(100vh - 56px)`, backgroundColor: '#131313' }}>

    <div className="mx-auto my-4 -mt-12 caption">
      <h1 className="md:text-9xl text-8xl font-bold text-center">Angelo</h1>
      <h1 className="md:text-9xl text-8xl font-bold text-center">Breuer</h1>
    </div>
    <h3 className="mx-auto font-semibold font-mono px-10 text-center text-lg">Hard- and Softwareengineer, Freelancer, and tech enthusiast. <Cursor /></h3>

    <svg preserveAspectRatio="none" viewBox="0 0 900 600" className="pointer-events-none overflow-hidden bottom-0 left-0 right-0 absolute object-cover block w-full">
      <path d="M0 555L30 551.8C60 548.7 120 542.3 180 545.3C240 548.3 300 560.7 360 562.7C420 564.7 480 556.3 540 552.7C600 549 660 550 720 542.2C780 534.3 840 517.7 870 509.3L900 501L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z" fill="#140049" strokeLinecap="round" strokeLinejoin="miter"></path>
    </svg>
  </main>
}

const AboutMe = () => {
  return <main className="relative" id="about">
    <div className="flex w-full flex-col justify-center items-center min-h-screen justify-items-center">
      <div className='lg:w-1/3 md:w-2/3 w-full px-12 md:px-0' style={{ marginBottom: `${WaveSvgHeight}px` }}>
        <div className='mx-auto flex items-center justify-center'>
          <h1 className="text-center text-4xl my-6 focus-line cursor-pointer" onClick={() => window.location.hash = "about"}>
            {/* Additional container for focus line */}
            <div className='flex space-x-4'>
              <span>👋</span>
              <span className='font-mono font-bold'>About me</span>
            </div>
          </h1>
        </div>

        <p className='font-mono text-xl text-justify'>Hi! I&apos;m Angelo Breuer. I like hard and software engineering. In my spare time, I spend a lot of time with small devices in the circle of the Internet of Things and embedded application development. I&apos;m currently attending a college in Germany to obtain my Abitur, roughly comparable to ACT tests.</p>
      </div>
    </div>

    <svg preserveAspectRatio="none" viewBox="0 0 900 600" className="pointer-events-none overflow-hidden bottom-0 left-0 right-0 absolute object-cover block w-full">
      <path d="M0 510L25 507C50 504 100 498 150 498.5C200 499 250 506 300 508.5C350 511 400 509 450 512.5C500 516 550 525 600 527.7C650 530.3 700 526.7 750 518.2C800 509.7 850 496.3 875 489.7L900 483L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z" fill="#131313" strokeLinecap="round" strokeLinejoin="miter"></path>
    </svg>
  </main>
}

const Projects = () => {
  const projectData = [
    {
      title: "Lavalink4NET",
      description: "Lavalink4NET is a popular Lavalink client for discord bots based on the .NET ecosystem. The client supports out of the box auto scaling and node balancing.",
      githubKey: "angelobreuer/Lavalink4NET",
      image: {
        path: '/d4b246b4d93f478383b1d56292339433.png',
        alt: "Lavalink4NET banner.",
      },
    },
    {
      title: "Localtunnel .NET",
      description: "Localtunnel Client is an implementation of a .NET client for routing traffic to a development machine using an exposed public DNS host over the Localtunnel.me network. The program can be installed as an integrated tool or as a library.",
      githubKey: "angelobreuer/localtunnel.net",
      image: {
        path: '/d77da23b4ecc4b16bd8d3fe24b404a7e.png',
        alt: "Demonstration of the localtunnel client.",
      },
    }
  ]

  const ProjectBanner = ({ project }: { project: typeof projectData[0] }) => {
    return <div className='flex w-full justify-center items-center'>
      <div>
        <img alt={project.image.alt} src={project.image.path} />
      </div>
    </div>
  }

  const ProjectDetails = ({ project }: { project: typeof projectData[0] }) => {
    return <div className="p-6 pb-0 space-y-4 max-w-5xl">
      <a href="https://github.com/angelobreuer/localtunnel-client" className="hover:underline font-bold text-2xl">{project.title}</a>
      <p className='font-mono'>{project.description}</p>
      <ProjectStatsView name={project.githubKey} />
    </div>
  }

  return <section
    style={{ backgroundColor: '#131313' }}
    className="relative min-h-screen"
    id="projects">

    <div className="flex flex-col" style={{ paddingBottom: `${WaveSvgHeight}px` }}>
      <h1 className="mx-auto text-center text-3xl font-bold font-mono my-6 focus-line cursor-pointer" onClick={() => window.location.hash = "projects"}>
        Projects
      </h1>

      <div className="flex w-full flex-col justify-center items-center justify-items-center">
        <div className='lg:w-1/3 md:w-2/3 w-full px-12 md:px-0' style={{ marginBottom: `${WaveSvgHeight}px` }}>
          <div className='mx-auto flex items-center justify-center'>
            <p className='font-mono text-xl text-justify'>
              During my free time, I work on a lot of personal projects. Here are some of my projects. I am currently working on a bigger project, but for now it should remain a secret.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-20">
        {
          projectData.map((project, index) => {
            return <div key={project.title} className="grid lg:grid-cols-2 grid-cols-1 mb-32">
              {index % 2 === 0 ? <>
                <ProjectDetails project={project} />
                <ProjectBanner project={project} />
              </> : <>
                <div className="lg:block hidden">
                  <ProjectBanner project={project} />
                </div>

                <ProjectDetails project={project} />

                <div className="lg:hidden block">
                  <ProjectBanner project={project} />
                </div>
              </>}
            </div>
          })
        }
      </div>
    </div>

    <svg preserveAspectRatio="none" viewBox="0 0 900 600" className="pointer-events-none overflow-hidden bottom-0 left-0 right-0 absolute object-cover block w-full">
      <path d="M0 555L30 551.8C60 548.7 120 542.3 180 545.3C240 548.3 300 560.7 360 562.7C420 564.7 480 556.3 540 552.7C600 549 660 550 720 542.2C780 534.3 840 517.7 870 509.3L900 501L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z" fill="#140049" strokeLinecap="round" strokeLinejoin="miter"></path>
    </svg>
  </section>
}

const Footer = () => {
  return <footer className="mt-6 py-10 space-y-10">
    <div className='flex justify-center space-x-12'>
      <a href="https://github.com/angelobreuer" className="flex space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#fff" />
        </svg>
        <span>GitHub</span>
      </a>

      <a href="mailto:info@angelobreuer.de" className="flex space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>

        <span>Mail</span>
      </a>
    </div>

    <p className='flex justify-center'>&copy; Angelo Breuer {new Date().getFullYear()}</p>
  </footer>
}

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Angelo Breuer</title>
        <meta name="description" content="Angelo Breuer - Hard- and Softwareengineer, Freelancer, and tech enthusiast." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <Landing />
      <AboutMe />
      <Projects />
      <Footer />

      <GitHubPresenter />
    </div>
  )
}

export default Home
