"use client"

import { LoadingIndicator } from "@/components/widgets/loading-indicator";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "@/api/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
    const [username, setUsername] = useState<string>("");
    
      useEffect(() => {
        fetchUserInfo().then((user) => {
          if (user && user.username) {
            setUsername(user.username);
          }
        });
      }, []);

    return (
        <div className="px-[5%] py-10 md:px-[20%] text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl my-2">{username}</CardTitle>
                    <CardDescription>Edit your profile details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label></Label>
                        <Input placeholder="Enter a username" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}