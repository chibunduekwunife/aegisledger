import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DemoSection() {
    return (
        <div className="flex flex-col gap-3 text-center py-8 md:py-10">
            <h1 className="text-xl font-bold">SEE AEGIS LEDGER IN ACTION</h1>
            <Card className="flex flex-col gap-y-5 w-full mx-auto py-12">
                <CardHeader className="text-center">
                    <CardTitle>Interactive Window</CardTitle>
                    <CardDescription>Try the in-house AI assistant</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col w-full max-w-sm md:flex-row md:max-w-2xl items-center gap-2 mx-auto">
                        <Input
                            type="text"
                            placeholder="Try typing (e.g. Spent $30 on lunch)"
                            className="w-full"
                        />
                        <Button
                            type="submit"
                            className="w-full md:w-auto"
                        >
                            Log Transaction
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}