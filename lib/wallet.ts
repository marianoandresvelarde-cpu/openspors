export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: number | null
  balance: string | null
}

export class WalletService {
  private static instance: WalletService
  private listeners: ((state: WalletState) => void)[] = []
  private isConnecting = false

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService()
    }
    return WalletService.instance
  }

  async connectWallet(): Promise<WalletState> {
    if (this.isConnecting) {
      console.log("[v0] Wallet connection already in progress, please wait...")
      throw new Error("Wallet connection already in progress")
    }

    try {
      this.isConnecting = true

      // Check if MetaMask is installed
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethereum = (window as any).ethereum

        const existingAccounts = await ethereum.request({ method: "eth_accounts" })
        if (existingAccounts.length > 0) {
          console.log("[v0] Wallet already connected, using existing connection")
          const chainId = await ethereum.request({ method: "eth_chainId" })
          const balance = await ethereum.request({
            method: "eth_getBalance",
            params: [existingAccounts[0], "latest"],
          })

          const walletState: WalletState = {
            isConnected: true,
            address: existingAccounts[0],
            chainId: Number.parseInt(chainId, 16),
            balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          }

          this.notifyListeners(walletState)
          return walletState
        }

        // Request account access only if not already connected
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        })

        // Get chain ID
        const chainId = await ethereum.request({
          method: "eth_chainId",
        })

        // Get balance
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        const walletState: WalletState = {
          isConnected: true,
          address: accounts[0],
          chainId: Number.parseInt(chainId, 16),
          balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4), // Convert from wei to ETH
        }

        this.notifyListeners(walletState)
        return walletState
      } else {
        throw new Error("MetaMask not installed")
      }
    } catch (error) {
      console.error("[v0] Wallet connection error:", error)
      const walletState: WalletState = {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      }
      this.notifyListeners(walletState)
      return walletState
    } finally {
      this.isConnecting = false
    }
  }

  async disconnectWallet(): Promise<WalletState> {
    const walletState: WalletState = {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    }
    this.notifyListeners(walletState)
    return walletState
  }

  async switchToMoonbaseAlpha(): Promise<boolean> {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethereum = (window as any).ethereum

        // Moonbase Alpha network parameters
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x507" }], // 1287 in hex
        })
        return true
      }
      return false
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x507",
                chainName: "Moonbase Alpha",
                nativeCurrency: {
                  name: "DEV",
                  symbol: "DEV",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
                blockExplorerUrls: ["https://moonbase.moonscan.io/"],
              },
            ],
          })
          return true
        } catch (addError) {
          console.error("[v0] Error adding network:", addError)
          return false
        }
      }
      console.error("[v0] Error switching network:", error)
      return false
    }
  }

  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners(state: WalletState) {
    this.listeners.forEach((listener) => listener(state))
  }

  async getCurrentState(): Promise<WalletState> {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethereum = (window as any).ethereum
        const accounts = await ethereum.request({ method: "eth_accounts" })

        if (accounts.length > 0) {
          const chainId = await ethereum.request({ method: "eth_chainId" })
          const balance = await ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })

          return {
            isConnected: true,
            address: accounts[0],
            chainId: Number.parseInt(chainId, 16),
            balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          }
        }
      }

      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      }
    } catch (error) {
      console.error("[v0] Error getting wallet state:", error)
      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      }
    }
  }
}
