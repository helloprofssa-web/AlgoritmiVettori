import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "../components/ui";
import Footer from "../components/Footer";

export default function PlaceholderPage({ title, description, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla home
        </Button>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-slate-600 leading-7">{description}</p>
            <p className="text-slate-500">
              Questa sezione è pronta per essere completata con la simulazione interattiva.
            </p>
          </CardContent>
        </Card>
      </div>
          <Footer />
    </div>
  );
}