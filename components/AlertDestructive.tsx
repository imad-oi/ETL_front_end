import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


export function AlertDestructive() {
    return (
        <Alert variant="destructive">
            {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    )
}
