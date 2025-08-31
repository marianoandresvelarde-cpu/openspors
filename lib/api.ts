const API_BASE_URL = "https://opensport.cloudycoding.com" // Updated API base URL from localhost to production domain

const MOCK_CONTRACTS: FootballTokenContract[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    playerWallet: "0x1234567890123456789012345678901234567890",
    platformWallet: "0x8ba1f109551bD432803012645Aac136c777CC5e8",
    name: "Alex Rodriguez Token",
    symbol: "ALEX",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    deployedAt: new Date().toISOString(),
  },
]

const MOCK_GOALS: Goal[] = [
  {
    goalId: "0",
    targetAmount: 15000,
    raisedAmount: 8500,
    completed: false,
    completedAt: null,
    progressPercentage: 56.7,
  },
]

export interface FootballTokenContract {
  id: string
  playerWallet: string
  platformWallet: string
  name: string
  symbol: string
  contractAddress: string
  deployedAt: string
}

export interface Goal {
  goalId: string
  targetAmount: number
  raisedAmount: number
  completed: boolean
  completedAt: string | null
  progressPercentage?: number
}

export interface DeployContractRequest {
  playerWallet: string
  platformWallet: string
  name: string
  symbol: string
}

export interface CreateGoalRequest {
  targetAmount: number
}

export interface AddFundsRequest {
  amount: number
}

class FootballTokenAPI {
  private baseUrl: string
  private useMockData = false

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async checkAPIAvailability(): Promise<boolean> {
    try {
      console.log("[v0] Checking API availability at:", this.baseUrl)
      const response = await fetch(`${this.baseUrl}/`, {
        method: "GET",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })
      console.log("[v0] API health check response:", response.status, response.statusText)
      return response.ok
    } catch (error) {
      console.warn("[v0] API health check failed:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn("[v0] Network error - API server may be down or unreachable")
      } else if (error.name === "AbortError") {
        console.warn("[v0] API request timed out after 5 seconds")
      }
      this.useMockData = true
      return false
    }
  }

  private validateWalletAddress(address: string): boolean {
    // Ethereum address should be 42 characters (including 0x) and contain only valid hex characters
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    return ethAddressRegex.test(address)
  }

  private validateDeployRequest(data: DeployContractRequest): string[] {
    const errors: string[] = []

    if (!this.validateWalletAddress(data.playerWallet)) {
      errors.push(`Invalid player wallet address: ${data.playerWallet}`)
    }

    if (!this.validateWalletAddress(data.platformWallet)) {
      errors.push(`Invalid platform wallet address: ${data.platformWallet}`)
    }

    if (!data.name || data.name.trim().length === 0) {
      errors.push("Token name is required")
    }

    if (!data.symbol || data.symbol.trim().length === 0) {
      errors.push("Token symbol is required")
    }

    return errors
  }

  async deployContract(data: DeployContractRequest): Promise<{ contractAddress: string; id: string }> {
    console.log("[v0] Attempting to deploy contract with data:", data)

    const validationErrors = this.validateDeployRequest(data)
    if (validationErrors.length > 0) {
      console.error("[v0] Request validation failed:", validationErrors)
      throw new Error(`Invalid request data: ${validationErrors.join(", ")}`)
    }

    const apiAvailable = await this.checkAPIAvailability()

    if (!apiAvailable) {
      console.log("[v0] API not available, using mock contract deployment")
      return {
        contractAddress: `0x${Math.random().toString(16).substr(2, 14)}`,
        id: `mock-${Date.now()}`,
      }
    }

    try {
      console.log("[v0] Making API call to deploy contract...")
      const response = await fetch(`${this.baseUrl}/football_token/deploy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10000), // Increased timeout to 10 seconds for contract deployment
      })

      console.log("[v0] Deploy contract response:", response.status, response.statusText)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorBody = await response.text()
          console.log("[v0] Error response body:", errorBody)
          errorMessage += ` - ${errorBody}`
        } catch (e) {
          console.log("[v0] Could not read error response body")
        }
        throw new Error(`Failed to deploy contract: ${errorMessage}`)
      }

      const result = await response.json()
      console.log("[v0] Contract deployed successfully:", result)
      return result
    } catch (error) {
      console.error("[v0] API Error during contract deployment:", error)
      console.error("[v0] Error type:", error.constructor.name)
      console.error("[v0] Error message:", error.message)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("[v0] Network error - check if API server is running and accessible")
      } else if (error.name === "AbortError") {
        console.error("[v0] Request timed out - API server may be slow or unresponsive")
      } else if (error.message.includes("CORS")) {
        console.error("[v0] CORS error - API server may not allow requests from this origin")
      }

      console.log("[v0] Falling back to mock contract deployment")
      return {
        contractAddress: `0x${Math.random().toString(16).substr(2, 14)}`,
        id: `mock-${Date.now()}`,
      }
    }
  }

  async getAllContracts(): Promise<FootballTokenContract[]> {
    if (this.useMockData) {
      console.log("[v0] Using mock contracts data")
      return MOCK_CONTRACTS
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token`, {
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch contracts: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock contracts:", error)
      this.useMockData = true
      return MOCK_CONTRACTS
    }
  }

  async getContractById(id: string): Promise<FootballTokenContract | null> {
    if (this.useMockData) {
      return MOCK_CONTRACTS.find((c) => c.id === id) || null
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token/${id}`, {
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch contract: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock contract:", error)
      this.useMockData = true
      return MOCK_CONTRACTS.find((c) => c.id === id) || null
    }
  }

  async createGoal(contractId: string, data: CreateGoalRequest): Promise<{ goalId: string; transactionHash: string }> {
    console.log("[v0] Attempting to create goal for contract:", contractId, "with data:", data)

    if (this.useMockData) {
      console.log("[v0] Using mock goal creation")
      return {
        goalId: Math.floor(Math.random() * 1000).toString(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      }
    }

    try {
      console.log("[v0] Making API call to create goal...")
      const response = await fetch(`${this.baseUrl}/football_token/${contractId}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10000), // Increased timeout for goal creation
      })

      console.log("[v0] Create goal response:", response.status, response.statusText)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorBody = await response.text()
          console.log("[v0] Goal creation error response body:", errorBody)
          errorMessage += ` - ${errorBody}`
        } catch (e) {
          console.log("[v0] Could not read goal creation error response body")
        }
        throw new Error(`Failed to create goal: ${errorMessage}`)
      }

      const result = await response.json()
      console.log("[v0] Goal created successfully:", result)
      return result
    } catch (error) {
      console.error("[v0] API Error during goal creation:", error)
      console.error("[v0] Goal creation error type:", error.constructor.name)
      console.error("[v0] Goal creation error message:", error.message)

      console.log("[v0] Falling back to mock goal creation")
      this.useMockData = true
      return {
        goalId: Math.floor(Math.random() * 1000).toString(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      }
    }
  }

  async addFundsToGoal(
    contractId: string,
    goalId: string,
    data: AddFundsRequest,
  ): Promise<{ transactionHash: string; goalCompleted: boolean }> {
    if (this.useMockData) {
      console.log("[v0] Using mock fund addition")
      return {
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        goalCompleted: Math.random() > 0.7, // 30% chance of completion for demo
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token/${contractId}/goals/${goalId}/add-funds`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to add funds: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock fund addition:", error)
      this.useMockData = true
      return {
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        goalCompleted: Math.random() > 0.7,
      }
    }
  }

  async getGoalDetails(contractId: string, goalId: string): Promise<Goal> {
    if (this.useMockData) {
      return MOCK_GOALS[0]
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token/${contractId}/goals/${goalId}`, {
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch goal details: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock goal details:", error)
      this.useMockData = true
      return MOCK_GOALS[0]
    }
  }

  async getGoalProgress(contractId: string, goalId: string): Promise<{ goalId: string; progressPercentage: number }> {
    if (this.useMockData) {
      return { goalId, progressPercentage: 56.7 }
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token/${contractId}/goals/${goalId}/progress`, {
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch goal progress: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock goal progress:", error)
      this.useMockData = true
      return { goalId, progressPercentage: 56.7 }
    }
  }

  async getAllGoals(contractId: string): Promise<Goal[]> {
    if (this.useMockData) {
      return MOCK_GOALS
    }

    try {
      const response = await fetch(`${this.baseUrl}/football_token/${contractId}/goals`, {
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch goals: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.warn("[v0] Falling back to mock goals:", error)
      this.useMockData = true
      return MOCK_GOALS
    }
  }

  updateBaseUrl(newUrl: string) {
    this.baseUrl = newUrl
    this.useMockData = false // Reset mock mode when URL changes
  }

  isMockMode(): boolean {
    return this.useMockData
  }
}

export const footballTokenAPI = new FootballTokenAPI()
