import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InsightForm from "./components/insight-form";

export default function InsightsPage() {
  return (
    <div className="p-5">
      <div className="mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Insights</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Select Insights Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <InsightForm/>
            </CardContent>
        </Card>
        <Card className="md:col-span-2" />
      </div>
    </div>
  );
}
