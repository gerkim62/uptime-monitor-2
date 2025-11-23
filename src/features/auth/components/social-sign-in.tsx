"use client"

import * as React from "react"
import { siGithub } from "simple-icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { authClient } from "@/lib/auth-client"


export default function SocialSignIn() {
    const [isLoading, setIsLoading] = React.useState<string | null>(null)
    const [lastMethod, setLastMethod] = React.useState<string | null>(null)

    React.useEffect(() => {
        const method = authClient.getLastUsedLoginMethod()
        setLastMethod(method)
    }, [])

    const handleSocialSignIn = async (provider: "github" | "google") => {
        setIsLoading(provider)

        try {
            const result = await authClient.signIn.social({
                provider,
            })

            if (result.error) {
                toast.error(result.error.message || `Failed to sign in with ${provider}`)
                return
            }

        } catch {
            toast.error(`An unexpected error occurred while signing in with ${provider}`)
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="relative">
                <Button
                    variant="outline"
                    className="w-full bg-[#181717] hover:bg-[#24292e] text-white border-[#181717] dark:bg-[#24292e] dark:hover:bg-[#2d333b] dark:border-[#24292e] flex items-center justify-center"
                    onClick={() => handleSocialSignIn("github")}
                    disabled={isLoading !== null}
                >
                    <LoadingSwap isLoading={isLoading === "github"}>
                        <div className="flex items-center">
                            <svg
                                className="mr-2 h-4 w-4 shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d={siGithub.path} />
                            </svg>
                            <span className="whitespace-nowrap">GitHub</span>
                        </div>
                    </LoadingSwap>
                </Button>
                {lastMethod === "github" && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 text-[10px] leading-tight">
                        Last used
                    </Badge>
                )}
            </div>

            <div className="relative">
                <Button
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600 flex items-center justify-center"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={isLoading !== null}
                >
                    <LoadingSwap isLoading={isLoading === "google"}>
                        <div className="flex items-center">
                            <svg
                                className="mr-2 h-5 w-5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="whitespace-nowrap">Google</span>
                        </div>
                    </LoadingSwap>
                </Button>
                {lastMethod === "google" && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 text-[10px] leading-tight">
                        Last used
                    </Badge>
                )}
                {!lastMethod && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 text-[10px] leading-tight">
                        Recommended
                    </Badge>
                )}
            </div>
        </div>
    )
}