import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTestComponent } from "./data-test";
import { DataTestTwoComponent } from "./data-test2";

export default function DataSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Spending Trends</CardTitle>
          <CardDescription>Monitor spending habits</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTestComponent/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Spending Trends</CardTitle>
          <CardDescription>Monitor spending habits</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTestTwoComponent />
        </CardContent>
      </Card>
    </div>
  );
}
