"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Target,
  Users,
  CheckCircle,
  Star,
  DollarSign,
  Search,
  ArrowLeft,
  PlayCircle,
  Upload,
  TrendingUp,
  Building2,
} from "lucide-react"

// Mock data
const careerObjectives = {
  nutrition: {
    currentPlan: "Basic",
    recommendedPlan: "Elite Professional Plan",
    cost: 450,
    description: "Personalized nutrition with macro tracking and specific supplementation",
  },
  training: {
    currentPlan: "Local Training",
    recommendedPlan: "High Performance Academy",
    cost: 1200,
    description: "Technical and physical training with certified coaches",
  },
  equipment: {
    items: [
      { name: "Professional boots", cost: 300, priority: "High" },
      { name: "Training gear", cost: 200, priority: "Medium" },
      { name: "Recovery equipment", cost: 800, priority: "High" },
    ],
  },
  competitions: {
    upcoming: [
      { name: "Regional U-20 League", cost: 500, date: "March 2024" },
      { name: "National Tournament", cost: 1500, date: "June 2024" },
    ],
  },
  totalMonthlyNeeds: 1250,
}

const athleteProfile = {
  name: "Alex Rodriguez",
  sport: "Football",
  position: "Midfielder",
  avatar: "/alex-rodriguez-argentina.png",
  stats: {
    matches: 17,
    votes: 122,
    goalsAssists: 21,
    rating: 7.7,
  },
  followers: 28,
  profileViews: 25,
  following: 42,
  careerObjectives: careerObjectives,
  investmentGoal: 15000,
  currentInvestment: 8500,
  roi: "+12%",
}

const challenges = [
  {
    id: 0,
    title: "Basic Ball Control",
    description: "Demonstrate fundamental ball control skills",
    difficulty: "Beginner",
    unlocked: true,
    completed: true,
    videoUrl: "https://www.youtube.com/embed/kne4nXTBzWs",
    criteria: [
      { name: "Control", description: "Maintaining ball control", weight: 40 },
      { name: "Posture", description: "Correct body position", weight: 30 },
      { name: "Consistency", description: "Successful exercise repetition", weight: 30 },
    ],
  },
  {
    id: 1,
    title: "Skill Move Mastery",
    description: "Master advanced dribbling techniques",
    difficulty: "Intermediate",
    unlocked: true,
    completed: false,
    videoUrl: "https://www.youtube.com/embed/NydjVeXHoFM",
    criteria: [
      { name: "Technique", description: "Correct movement execution", weight: 40 },
      { name: "Fluidity", description: "Smoothness and naturalness of movement", weight: 35 },
      { name: "Control", description: "Maintaining ball control", weight: 25 },
    ],
  },
  {
    id: 3,
    title: "Speed Dribbling",
    description: "Dribble through cones at maximum speed",
    difficulty: "Advanced",
    unlocked: false,
    completed: false,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    criteria: [
      { name: "Speed", description: "Course completion speed", weight: 40 },
      { name: "Control", description: "Ball maintenance", weight: 35 },
      { name: "Agility", description: "Direction changes", weight: 25 },
    ],
  },
]

const skillCategories = [
  { name: "Technical", value: 85, color: "text-primary" },
  { name: "Physical", value: 72, color: "text-accent" },
  { name: "Mental", value: 90, color: "text-chart-3" },
  { name: "Tactical", value: 78, color: "text-chart-4" },
]

const mockVideos = [
  {
    id: 1,
    title: "Perfect Free Kick Technique",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ratings: {
      technical: 8.5,
      execution: 9.2,
      creativity: 7.8,
      overall: 8.5,
    },
    communityRating: 4.2,
    totalVotes: 156,
    comments: [
      {
        id: 1,
        author: "Carlos M.",
        avatar: "/diverse-group-athletes.png",
        rating: 4.5,
        comment: "Excellent technique! The ball placement was perfect. Could improve on follow-through.",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        author: "Sofia R.",
        avatar: "/female-basketball-player.png",
        rating: 4.0,
        comment: "Great power and accuracy. Would love to see more consistency in different weather conditions.",
        timestamp: "1 day ago",
      },
      {
        id: 3,
        author: "Miguel L.",
        avatar: "/tennis-player.png",
        rating: 4.8,
        comment: "This is professional level! The approach and strike are textbook perfect.",
        timestamp: "5 hours ago",
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Dribbling Skills",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ratings: {
      technical: 9.1,
      execution: 8.7,
      creativity: 9.5,
      overall: 9.1,
    },
    communityRating: 4.6,
    totalVotes: 203,
    comments: [
      {
        id: 1,
        author: "Diego F.",
        avatar: "/diverse-group-athletes.png",
        rating: 5.0,
        comment: "Incredible ball control! The creativity in tight spaces is outstanding.",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        author: "Ana P.",
        avatar: "/female-basketball-player.png",
        rating: 4.2,
        comment: "Very impressive skills. Maybe work on speed of execution for match situations.",
        timestamp: "2 days ago",
      },
    ],
  },
]

const athleteCards = [
  {
    id: 1,
    name: "Alex Rodriguez",
    sport: "Football",
    position: "Midfielder",
    age: 19,
    avatar: "/alex-rodriguez-argentina.png",
    rating: 8.5,
    stats: { matches: 17, goals: 12, assists: 9 },
    goals: ["Professional Contract", "National Team"],
    investmentGoal: 15000,
    currentInvestment: 8500,
    roi: "+12%",
    location: "Buenos Aires, Argentina",
    videos: mockVideos,
  },
  {
    id: 2,
    name: "Maria Santos",
    sport: "Basketball",
    position: "Point Guard",
    age: 18,
    avatar: "/female-basketball-player.png",
    rating: 9.2,
    stats: { matches: 23, points: 18.5, assists: 7.2 },
    goals: ["College Scholarship", "WNBA Draft"],
    investmentGoal: 25000,
    currentInvestment: 12000,
    roi: "+18%",
    location: "Los Angeles, USA",
    videos: [mockVideos[0]], // Different videos for different athletes
  },
  {
    id: 3,
    name: "James Wilson",
    sport: "Tennis",
    position: "Singles",
    age: 20,
    avatar: "/tennis-player.png",
    rating: 7.8,
    stats: { matches: 45, wins: 32, ranking: 156 },
    goals: ["ATP Tour", "Top 100 Ranking"],
    investmentGoal: 35000,
    currentInvestment: 5000,
    roi: "+8%",
    location: "London, UK",
    videos: [mockVideos[1]],
  },
]

const whitelistBrands = [
  {
    id: 1,
    name: "Nike",
    category: "Equipment",
    logo: "/nike-swoosh.png",
    description: "Professional footwear and sportswear",
    discount: "15%",
    verified: true,
    whitelistFee: 299,
    exclusivityLevel: "Premium",
    products: [
      { name: "Mercurial Boots", price: 300, category: "Footwear" },
      { name: "Training Set", price: 150, category: "Apparel" },
    ],
  },
  {
    id: 2,
    name: "Gatorade",
    category: "Nutrition",
    logo: "/gatorade-logo.png",
    description: "Sports drinks and supplements",
    discount: "20%",
    verified: true,
    whitelistFee: 199,
    exclusivityLevel: "Standard",
    products: [
      { name: "Monthly nutrition plan", price: 450, category: "Nutrition" },
      { name: "Sports supplements", price: 200, category: "Supplements" },
    ],
  },
  {
    id: 3,
    name: "Elite Academy",
    category: "Training",
    logo: "/training-academy-logo.png",
    description: "Personalized professional training",
    discount: "10%",
    verified: true,
    whitelistFee: 149,
    exclusivityLevel: "Basic",
    products: [
      { name: "Training sessions", price: 800, category: "Training" },
      { name: "Personalized technical plan", price: 600, category: "Development" },
    ],
  },
]

const spendingHistory = [
  {
    brand: "Nike",
    amount: 450,
    category: "Equipment",
    date: "2024-01-15",
    items: ["Mercurial Boots", "Training gear"],
  },
  { brand: "Gatorade", amount: 450, category: "Nutrition", date: "2024-01-01", items: ["Monthly nutrition plan"] },
  {
    brand: "Elite Academy",
    amount: 1200,
    category: "Training",
    date: "2024-01-01",
    items: ["Monthly training"],
  },
]

const BrandsPartnerDashboard = ({
  setUserType,
}: { setUserType: (type: "selection" | "athlete" | "investor" | "brands" | null) => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-poppins">
              OpenSport
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserType("selection")}
              className="text-slate-300 hover:text-white hover:bg-slate-700 text-sm px-3 py-1.5"
            >
              Switch Role
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance text-white">Panel de Marcas Whitelist</h2>
            <p className="text-slate-400">Exclusividad de compra • Trazabilidad completa • Beneficios garantizados</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1">Marca Whitelist</Badge>
        </div>

        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Modelo de Exclusividad OpenSport</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-emerald-400 font-medium">Exclusividad de Compra</p>
                <p className="text-slate-300">
                  Los deportistas solo pueden gastar dinero de inversión en marcas whitelist
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-blue-400 font-medium">Comisión OpenSport</p>
                <p className="text-slate-300">8% del total recaudado + 1% del deportista</p>
              </div>
              <div className="space-y-1">
                <p className="text-purple-400 font-medium">Fee Whitelist</p>
                <p className="text-slate-300">Pago mensual por acceso exclusivo a la plataforma</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Atletas Exclusivos</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Gasto Garantizado</p>
                  <p className="text-2xl font-bold text-white">$18,450</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Fee Whitelist</p>
                  <p className="text-2xl font-bold text-white">$299</p>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">ROI Exclusivo</p>
                  <p className="text-2xl font-bold text-white">+28%</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Athlete Spending Traceability */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              Trazabilidad Exclusiva de Gastos
            </CardTitle>
            <p className="text-sm text-slate-400">
              100% de las compras de deportistas se realizan únicamente en marcas whitelist
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-emerald-400">Exclusividad Garantizada</span>
              </div>
              <p className="text-xs text-slate-300">
                Los deportistas no pueden gastar dinero de inversión fuera de las marcas whitelist, garantizando el 100%
                de trazabilidad y exclusividad de compra.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/alex-rodriguez-argentina.png" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">Alex Rodriguez</p>
                    <p className="text-xs text-slate-400">Mediocampista • Argentina</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-400">$2,100</p>
                  <p className="text-xs text-slate-400">Total gastado</p>
                </div>
              </div>

              {spendingHistory.map((expense, index) => (
                <div key={index} className="ml-4 pl-4 border-l-2 border-slate-600 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">{expense.brand}</span>
                      <Badge className="bg-slate-600/50 text-slate-300 text-xs">{expense.category}</Badge>
                    </div>
                    <span className="text-sm font-medium text-emerald-400">${expense.amount}</span>
                  </div>
                  <div className="text-xs text-slate-400 ml-4">
                    {expense.items.join(", ")} • {expense.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Impact Analytics */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Impacto de Marca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300">Video Exposure</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Videos con tu marca</span>
                    <span className="text-sm text-white">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Visualizaciones totales</span>
                    <span className="text-sm text-white">125,430</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Engagement promedio</span>
                    <span className="text-sm text-emerald-400">8.7%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300">Rendimiento de Atletas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Rating promedio</span>
                    <span className="text-sm text-white">7.8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Mejora desde partnership</span>
                    <span className="text-sm text-emerald-400">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Atletas destacados</span>
                    <span className="text-sm text-white">8</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

import { footballTokenAPI, type FootballTokenContract, type Goal } from "../lib/api"

import { WalletService, type WalletState } from "../lib/wallet"

export default function SportifyApp() {
  const [userType, setUserType] = useState<"selection" | "athlete" | "investor" | "brands" | null>(null)
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [showInvestmentModal, setShowInvestmentModal] = useState<number | null>(null)
  const [showVideoModal, setShowVideoModal] = useState<number | null>(null)
  const [showChallengeModal, setShowChallengeModal] = useState<number | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState([1000])
  const [investmentPercentage, setInvestmentPercentage] = useState([5])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [showBrandModal, setShowBrandModal] = useState<number | null>(null)

  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  })
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  const [contracts, setContracts] = useState<FootballTokenContract[]>([])
  const [athleteGoals, setAthleteGoals] = useState<{ [athleteId: number]: Goal[] }>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const walletService = WalletService.getInstance()

    // Get initial wallet state
    walletService.getCurrentState().then(setWalletState)

    // Subscribe to wallet changes
    const unsubscribe = walletService.subscribe(setWalletState)

    // Listen for account changes
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethereum = (window as any).ethereum

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletState({
            isConnected: false,
            address: null,
            chainId: null,
            balance: null,
          })
        } else {
          walletService.getCurrentState().then(setWalletState)
        }
      }

      const handleChainChanged = () => {
        walletService.getCurrentState().then(setWalletState)
      }

      ethereum.on("accountsChanged", handleAccountsChanged)
      ethereum.on("chainChanged", handleChainChanged)

      return () => {
        unsubscribe()
        ethereum.removeListener("accountsChanged", handleAccountsChanged)
        ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }

    return unsubscribe
  }, [])

  const handleWalletConnect = async () => {
    if (isConnectingWallet) {
      console.log("[v0] Wallet connection already in progress")
      return
    }

    try {
      setIsConnectingWallet(true)
      const walletService = WalletService.getInstance()
      const state = await walletService.connectWallet()

      if (state.isConnected && state.chainId !== 1287) {
        // 1287 is Moonbase Alpha
        const switched = await walletService.switchToMoonbaseAlpha()
        if (!switched) {
          console.log("[v0] Please switch to Moonbase Alpha network manually")
        }
      }

      setShowWalletModal(false)
    } catch (error) {
      console.error("[v0] Wallet connection failed:", error)
      // Keep modal open on error so user can try again
    } finally {
      setIsConnectingWallet(false)
    }
  }

  const handleWalletDisconnect = async () => {
    const walletService = WalletService.getInstance()
    await walletService.disconnectWallet()
    setShowWalletModal(false)
  }

  const deployAthleteContract = async (athlete: any) => {
    try {
      setLoading(true)
      console.log("[v0] Deploying contract for:", athlete.name)

      if (!walletState.isConnected) {
        setShowWalletModal(true)
        return
      }

      const result = await footballTokenAPI.deployContract({
        playerWallet: walletState.address || `0x${athlete.id.toString().padStart(40, "0")}`, // Use connected wallet or mock
        platformWallet: "0x8ba1f109551bD432803012645Hac136c777CC5e", // Platform wallet
        name: `${athlete.name} Token`,
        symbol: athlete.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase(),
      })

      console.log("[v0] Contract deployed successfully:", result)

      // Create initial goal for the athlete
      const goalResult = await footballTokenAPI.createGoal(result.id, {
        targetAmount: athlete.investmentGoal,
      })

      console.log("[v0] Goal created:", goalResult)

      // Refresh contracts list
      await loadContracts()

      if (footballTokenAPI.isMockMode()) {
        console.log("[v0] Demo mode: Contract deployment simulated successfully")
      }
    } catch (error) {
      console.error("[v0] Error deploying contract:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadContracts = async () => {
    try {
      const contractsList = await footballTokenAPI.getAllContracts()
      setContracts(contractsList)
    } catch (error) {
      console.error("[v0] Error loading contracts:", error)
    }
  }

  const loadAthleteGoals = async (athleteId: number, contractId: string) => {
    try {
      const goals = await footballTokenAPI.getAllGoals(contractId)
      setAthleteGoals((prev) => ({
        ...prev,
        [athleteId]: goals,
      }))
    } catch (error) {
      console.error("[v0] Error loading athlete goals:", error)
    }
  }

  const handleInvestment = async (athlete: any) => {
    try {
      setLoading(true)
      console.log("[v0] Processing investment for:", athlete.name)

      if (!walletState.isConnected) {
        setShowWalletModal(true)
        setLoading(false)
        return
      }

      // Find athlete's contract
      const athleteContract = contracts.find((c) => c.name === `${athlete.name} Token`)

      if (!athleteContract) {
        console.log("[v0] No contract found, deploying new one")
        // Deploy contract if it doesn't exist
        await deployAthleteContract(athlete)
        return
      }

      // Get athlete's goals
      const goals = await footballTokenAPI.getAllGoals(athleteContract.id)
      const activeGoal = goals.find((g) => !g.completed)

      if (activeGoal) {
        console.log("[v0] Adding funds to existing goal:", activeGoal.goalId)
        // Add funds to existing goal
        const result = await footballTokenAPI.addFundsToGoal(athleteContract.id, activeGoal.goalId, {
          amount: investmentAmount[0],
        })

        console.log("[v0] Investment processed:", result)

        if (result.goalCompleted) {
          console.log("[v0] 🎉 Goal completed! Funds distributed automatically (8% platform, 92% athlete)")
        }

        // Refresh athlete goals
        await loadAthleteGoals(athlete.id, athleteContract.id)
      } else {
        console.log("[v0] No active goals found, creating new goal")
        await footballTokenAPI.createGoal(athleteContract.id, {
          targetAmount: athlete.investmentGoal,
        })
      }

      setShowInvestmentModal(null)

      if (footballTokenAPI.isMockMode()) {
        console.log("[v0] Demo mode: Investment processed successfully")
      }
    } catch (error) {
      console.error("[v0] Error processing investment:", error)
    } finally {
      setLoading(false)
    }
  }

  const WalletModal = () => {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">Connect Wallet</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWalletModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {walletState.isConnected ? (
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Address:</span>
                    <span className="text-white font-mono text-xs">
                      {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Balance:</span>
                    <span className="text-emerald-400 font-semibold">{walletState.balance} DEV</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Network:</span>
                    <span
                      className={`font-semibold ${walletState.chainId === 1287 ? "text-emerald-400" : "text-yellow-400"}`}
                    >
                      {walletState.chainId === 1287 ? "Moonbase Alpha" : `Chain ${walletState.chainId}`}
                    </span>
                  </div>
                </div>

                {walletState.chainId !== 1287 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-yellow-400 text-sm">
                      Please switch to Moonbase Alpha network for optimal experience.
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  onClick={handleWalletDisconnect}
                >
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.5 5.5C3.5 4.67 4.17 4 5 4h14c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5v-13zM5 5.5v13h14v-13H5z" />
                      <path d="M8.5 8.5h7v1h-7v-1zm0 2h7v1h-7v-1zm0 2h4v1h-4v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Connect Your Wallet</h3>
                  <p className="text-slate-400 text-sm">
                    Connect your wallet to invest in athletes and interact with smart contracts.
                  </p>
                </div>

                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={handleWalletConnect}
                  disabled={isConnectingWallet}
                >
                  {isConnectingWallet ? "Connecting..." : "Connect MetaMask"}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Don't have MetaMask?{" "}
                    <a
                      href="https://metamask.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:underline"
                    >
                      Download here
                    </a>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const InvestmentModal = ({ athlete }: { athlete: any }) => {
    const maxInvestment = athlete.investmentGoal - athlete.currentInvestment
    const maxPercentage = 25 // Maximum 25% as specified

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">Invest in {athlete.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInvestmentModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!walletState.isConnected && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <p className="text-orange-400 text-sm mb-2">Wallet connection required for blockchain transactions.</p>
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => setShowWalletModal(true)}
                >
                  Connect Wallet
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-300 mb-3 block">Investment Amount</Label>
                <div className="space-y-3">
                  <Slider
                    value={investmentAmount}
                    onValueChange={setInvestmentAmount}
                    max={maxInvestment}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>$100</span>
                    <span className="text-emerald-400 font-semibold">${investmentAmount[0].toLocaleString()}</span>
                    <span>${maxInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-300 mb-3 block">Ownership Percentage</Label>
                <div className="space-y-3">
                  <Slider
                    value={investmentPercentage}
                    onValueChange={setInvestmentPercentage}
                    max={maxPercentage}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>1%</span>
                    <span className="text-emerald-400 font-semibold">{investmentPercentage[0]}%</span>
                    <span>{maxPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Investment Amount:</span>
                  <span className="text-white font-semibold">${investmentAmount[0].toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Ownership:</span>
                  <span className="text-white font-semibold">{investmentPercentage[0]}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Expected ROI:</span>
                  <span className="text-emerald-400 font-semibold">+{athlete.roi}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-600">
                  <span className="text-slate-300">Blockchain:</span>
                  <span className="text-blue-400 font-semibold">Moonbase Alpha</span>
                </div>
                {walletState.isConnected && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Wallet:</span>
                    <span className="text-emerald-400 font-mono text-xs">
                      {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                onClick={() => setShowInvestmentModal(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                onClick={() => handleInvestment(athlete)}
                disabled={loading || !walletState.isConnected || isConnectingWallet}
              >
                {loading ? "Processing..." : walletState.isConnected ? "Confirm Investment" : "Connect Wallet First"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const InvestorDashboard = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <header className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-poppins font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                OpenSport
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className={`border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent ${
                  walletState.isConnected ? "border-emerald-500 text-emerald-400" : ""
                }`}
                onClick={() => setShowWalletModal(true)}
              >
                {walletState.isConnected ? (
                  <>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserType("selection")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-balance text-white">Descubre Atletas</h2>
              <p className="text-slate-400">Encuentra e invierte en talento prometedor</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">Inversor</Badge>
          </div>

          <div className="space-y-4">
            {athleteCards.map((athlete) => (
              <Card key={athlete.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-20 w-20 border-2 border-blue-500/30">
                        <AvatarImage src={athlete.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-slate-700 text-white">
                          {athlete.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-white">{athlete.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold text-white">{athlete.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-0.5">
                            {athlete.sport}
                          </Badge>
                          <span>•</span>
                          <span>{athlete.position}</span>
                          <span>•</span>
                          <span>{athlete.age} años</span>
                        </div>
                        <p className="text-sm text-slate-400">{athlete.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(athlete.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-400">{value}</div>
                          <div className="text-xs text-slate-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-slate-300">Objetivos de Carrera</h4>
                      <div className="flex flex-wrap gap-2">
                        {athlete.goals.map((goal, index) => (
                          <Badge
                            key={index}
                            className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs px-2 py-1"
                          >
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Progreso de Inversión</span>
                        <span className="text-emerald-400 font-semibold">
                          ${athlete.currentInvestment.toLocaleString()} / ${athlete.investmentGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(athlete.currentInvestment / athlete.investmentGoal) * 100}
                        className="h-2 mb-2 bg-slate-700"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>
                          ROI: <span className="text-emerald-400 font-semibold">{athlete.roi}</span>
                        </span>
                        <span>
                          {Math.round((athlete.currentInvestment / athlete.investmentGoal) * 100)}% financiado
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-sm py-2 bg-transparent"
                        onClick={() => setSelectedAthlete(selectedAthlete === athlete.id ? null : athlete.id)}
                      >
                        {selectedAthlete === athlete.id ? "Ocultar" : "Ver Detalles"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-700 hover:text-white text-sm py-2 bg-transparent"
                        onClick={() => setShowVideoModal(athlete.id)}
                      >
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Ver Videos
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2"
                        onClick={() => setShowInvestmentModal(athlete.id)}
                      >
                        <DollarSign className="h-3 w-3 mr-1" />
                        Invertir
                      </Button>
                    </div>
                  </div>

                  {selectedAthlete === athlete.id && (
                    <div className="border-t border-slate-700 bg-slate-700/30 p-6">
                      <h4 className="font-semibold mb-3 text-white">Performance Analysis</h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">Technical Skills</span>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="w-20 h-2 bg-slate-600" />
                            <span className="text-sm font-semibold text-white">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">Physical Condition</span>
                          <div className="flex items-center gap-2">
                            <Progress value={78} className="w-20 h-2 bg-slate-600" />
                            <span className="text-sm font-semibold text-white">78%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">Mental Strength</span>
                          <div className="flex items-center gap-2">
                            <Progress value={92} className="w-20 h-2 bg-slate-600" />
                            <span className="text-sm font-semibold text-white">92%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-600 pt-4">
                        <h4 className="font-semibold mb-3 text-white flex items-center gap-2">
                          <Target className="h-4 w-4 text-emerald-400" />
                          Gastos y Marcas Utilizadas
                        </h4>
                        <div className="space-y-3">
                          {spendingHistory.map((expense, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{expense.brand}</p>
                                  <p className="text-xs text-slate-400">{expense.items.join(", ")}</p>
                                </div>
                                <Badge className="bg-slate-700/50 text-slate-300 text-xs">{expense.category}</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-emerald-400">${expense.amount}</p>
                                <p className="text-xs text-slate-400">{expense.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-emerald-400 font-medium">
                              Total Gastado en Marcas Partner
                            </span>
                            <span className="text-lg font-bold text-emerald-400">
                              ${spendingHistory.reduce((total, expense) => total + expense.amount, 0).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Trazabilidad completa de inversión • {spendingHistory.length} transacciones
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {showInvestmentModal && <InvestmentModal athlete={athleteCards.find((a) => a.id === showInvestmentModal)!} />}
        {showVideoModal && <VideoModal athlete={athleteCards.find((a) => a.id === showVideoModal)!} />}
        {showWalletModal && <WalletModal />}
      </div>
    )
  }

  const CircularProgress = ({
    value,
    size = 80,
    strokeWidth = 8,
  }: { value: number; size?: number; strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${(value / 100) * circumference} ${circumference}`

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            className="text-primary transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
      </div>
    )
  }

  const UserTypeSelection = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white text-balance">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  OpenSport
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light text-balance max-w-2xl mx-auto">
                Showcase. Get Scouted. Get Funded.
              </p>
              <p className="text-lg text-slate-400 max-w-xl mx-auto text-balance">
                Join the premier sports community platform connecting athletes, investors, scouts, and brands.
              </p>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Athlete Card */}
            <div
              onClick={() => setUserType("athlete")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-blue-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                  <Target className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    Athlete
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Showcase your skills, complete challenges, and get discovered by scouts and investors.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Investor Card */}
            <div
              onClick={() => setUserType("investor")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-emerald-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
                  <TrendingUp className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                    Investor
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Discover promising talent and invest in the future of sports with transparent tracking.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Scout Card */}
            <div
              onClick={() => setUserType("investor")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-purple-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                  <Search className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    Scout
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Find exceptional talent using advanced analytics and community validation.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Brand Card */}
            <div
              onClick={() => setUserType("brands")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-orange-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-orange-500/50">
                  <Building2 className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                    Brand
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Join our exclusive whitelist and gain access to rising sports talent.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Powered by blockchain technology for transparent and secure transactions
            </p>
          </div>
        </div>
      </div>
    )
  }

  const VideoModal = ({ athlete }: { athlete: any }) => {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">Videos de {athlete.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVideoModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {athlete.videos.map((video) => (
                <div key={video.id} className="space-y-2">
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{video.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Community Rating: {video.communityRating}/5</span>
                    <span className="text-slate-400">{video.totalVotes} reviews</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const ChallengeModal = ({ challenge }: { challenge: any }) => {
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [uploading, setUploading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleUploadVideo = async () => {
      setUploading(true)
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setUploading(false)
      setSuccess(true)
    }

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">{challenge.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChallengeModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-slate-400">{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <iframe
                  src={challenge.videoUrl}
                  title={challenge.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300">Criteria</h4>
                <ul className="list-none pl-0 space-y-1">
                  {challenge.criteria.map((criterion) => (
                    <li
                      key={criterion.name}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                    >
                      <span className="text-sm text-slate-300">{criterion.name}</span>
                      <span className="text-xs text-slate-400">{criterion.weight}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-300 mb-2 block">Upload Your Video</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Paste YouTube URL"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-slate-300 placeholder:text-slate-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white relative"
                  disabled={uploading || success}
                  onClick={handleUploadVideo}
                >
                  {uploading ? (
                    <>Uploading...</>
                  ) : success ? (
                    <>
                      Uploaded <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Upload Video <Upload className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (userType === null || userType === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          {/* Logo and Welcome Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white text-balance">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  OpenSport
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light text-balance max-w-2xl mx-auto">
                Showcase. Get Scouted. Get Funded.
              </p>
              <p className="text-lg text-slate-400 max-w-xl mx-auto text-balance">
                Join the premier sports community platform connecting athletes, investors, scouts, and brands.
              </p>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Athlete Card */}
            <div
              onClick={() => setUserType("athlete")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-blue-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                  <Target className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    Athlete
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Showcase your skills, complete challenges, and get discovered by scouts and investors.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Investor Card */}
            <div
              onClick={() => setUserType("investor")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-emerald-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
                  <TrendingUp className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                    Investor
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Discover promising talent and invest in the future of sports with transparent tracking.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Scout Card */}
            <div
              onClick={() => setUserType("investor")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-purple-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                  <Search className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    Scout
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Find exceptional talent using advanced analytics and community validation.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Brand Card */}
            <div
              onClick={() => setUserType("brands")}
              className="group relative cursor-pointer bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-slate-600/50 hover:border-orange-400/60 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="relative space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-orange-500/50">
                  <Building2 className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                    Brand
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 text-balance transition-colors duration-300">
                    Join our exclusive whitelist and gain access to rising sports talent.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              Powered by blockchain technology for transparent and secure transactions
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (userType === "investor") {
    return <InvestorDashboard />
  }

  if (userType === "brands") {
    return <BrandsPartnerDashboard setUserType={setUserType} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-poppins">
              OpenSport
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserType("selection")}
              className="text-slate-300 hover:text-white hover:bg-slate-700 text-sm px-3 py-1.5"
            >
              Switch Role
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Target className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <TabsTrigger
              value="profile"
              className="text-slate-400 data-[state=active]:text-emerald-400 data-[state=active]:bg-slate-700/50"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              className="text-slate-400 data-[state=active]:text-emerald-400 data-[state=active]:bg-slate-700/50"
            >
              Challenges
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="text-slate-400 data-[state=active]:text-emerald-400 data-[state=active]:bg-slate-700/50"
            >
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-4 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={athleteProfile.avatar || "/placeholder.svg"}
                      alt={athleteProfile.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                    />
                    <Badge className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1">ST</Badge>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{athleteProfile.name}</h1>
                    <p className="text-slate-400">{athleteProfile.position}</p>
                    <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      SENART MOISSY
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 relative">
                      <div className="w-full h-full rounded-full border-4 border-slate-700 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{athleteProfile.stats.matches}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 relative">
                      <div className="w-full h-full rounded-full border-4 border-yellow-500 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{athleteProfile.stats.votes}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">Votes</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 relative">
                      <div className="w-full h-full rounded-full border-4 border-emerald-500 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{athleteProfile.stats.goalsAssists}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">Goals & Assists</div>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 relative">
                    <div className="w-full h-full rounded-full border-4 border-yellow-500 flex items-center justify-center bg-slate-800">
                      <span className="text-2xl font-bold text-white">{athleteProfile.stats.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{athleteProfile.followers}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{athleteProfile.profileViews}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Profile Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{athleteProfile.following}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Following</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Highlighted skills</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white bg-transparent"
                  >
                    VIEW MORE
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/kne4nXTBzWs"
                      title="Skill Video 1"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/IoA0YaCA2Yk"
                      title="Skill Video 2"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Professional Development Plan
                </CardTitle>
                <p className="text-sm text-slate-400">
                  Expert-designed plan optimized with AI according to your context
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Nutrición y Alimentación
                  </h4>
                  <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Plan Actual:</span>
                      <span className="text-sm text-slate-400">
                        {athleteProfile.careerObjectives.nutrition.currentPlan}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Plan Recomendado:</span>
                      <span className="text-sm text-blue-400 font-medium">
                        {athleteProfile.careerObjectives.nutrition.recommendedPlan}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {athleteProfile.careerObjectives.nutrition.description}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-600">
                      <span className="text-sm text-slate-300">Costo mensual:</span>
                      <span className="text-sm font-semibold text-emerald-400">
                        ${athleteProfile.careerObjectives.nutrition.cost}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Entrenamiento y Coaching
                  </h4>
                  <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Entrenamiento Actual:</span>
                      <span className="text-sm text-slate-400">
                        {athleteProfile.careerObjectives.training.currentPlan}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Plan Recomendado:</span>
                      <span className="text-sm text-blue-400 font-medium">
                        {athleteProfile.careerObjectives.training.recommendedPlan}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {athleteProfile.careerObjectives.training.description}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-600">
                      <span className="text-sm text-slate-300">Costo mensual:</span>
                      <span className="text-sm font-semibold text-emerald-400">
                        ${athleteProfile.careerObjectives.training.cost}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Equipamiento Necesario
                  </h4>
                  <div className="space-y-2">
                    {athleteProfile.careerObjectives.equipment.items.map((item, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex-1">
                          <span className="text-sm text-slate-300">{item.name}</span>
                          <Badge
                            className={`ml-2 text-xs ${
                              item.priority === "High"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold text-emerald-400">${item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Competencias Próximas
                  </h4>
                  <div className="space-y-2">
                    {athleteProfile.careerObjectives.competitions.upcoming.map((comp, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex-1">
                          <span className="text-sm text-slate-300">{comp.name}</span>
                          <div className="text-xs text-slate-400 mt-1">{comp.date}</div>
                        </div>
                        <span className="text-sm font-semibold text-emerald-400">${comp.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-300">Inversión Mensual Total Recomendada:</span>
                    <span className="text-lg font-bold text-emerald-400">
                      ${athleteProfile.careerObjectives.totalMonthlyNeeds}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    This investment is designed to accelerate your professional development and maximize your success
                    opportunities.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-600">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>AI-optimized plan according to your profile and goals</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="p-4 space-y-6">
            <div className="grid gap-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${challenge.completed ? "bg-emerald-500" : challenge.unlocked ? "bg-blue-500" : "bg-slate-600"}`}
                        />
                        <h3 className="font-semibold text-slate-100">{challenge.title}</h3>
                      </div>
                      {/* <span className="text-xs text-slate-400">{challenge.sport}</span> */}
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Difficulty: {challenge.difficulty}</span>
                      <Button
                        size="sm"
                        variant={challenge.completed ? "secondary" : !challenge.unlocked ? "ghost" : "default"}
                        disabled={!challenge.unlocked}
                        onClick={() => setShowChallengeModal(challenge.id)}
                        className="text-xs"
                      >
                        {challenge.completed ? "Completed" : !challenge.unlocked ? "Locked" : "Start Challenge"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="p-4 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">My Videos</CardTitle>
                <CardDescription className="text-slate-400">Recent reviews and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-100">Ball Control Challenge</h4>
                      <span className="text-xs text-emerald-400">Completed</span>
                    </div>
                    <div className="aspect-video bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">YouTube Video Preview</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Community Rating: 8.5/10</span>
                      <span className="text-slate-400">12 reviews</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-100">Shooting Accuracy</h4>
                      <span className="text-xs text-blue-400">Under Review</span>
                    </div>
                    <div className="aspect-video bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">YouTube Video Preview</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Pending community review</span>
                      <span className="text-slate-400">3 reviews</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Community Activity</CardTitle>
                <CardDescription className="text-slate-400">Recent reviews and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-700/20 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    MR
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">
                      <span className="font-medium text-slate-100">Maria Rodriguez</span> rated your Ball Control video
                    </p>
                    <p className="text-xs text-slate-400 mt-1">2 hours ago • 9/10</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-700/20 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    JS
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">
                      <span className="font-medium text-slate-100">James Smith</span> commented on your technique
                    </p>
                    <p className="text-xs text-slate-400 mt-1">5 hours ago • "Great form!"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {showInvestmentModal && <InvestmentModal athlete={athleteCards.find((a) => a.id === showInvestmentModal)!} />}
      {showVideoModal && <VideoModal athlete={athleteCards.find((a) => a.id === showVideoModal)!} />}
      {showChallengeModal && <ChallengeModal challenge={challenges.find((c) => c.id === showChallengeModal)!} />}
    </div>
  )
}
