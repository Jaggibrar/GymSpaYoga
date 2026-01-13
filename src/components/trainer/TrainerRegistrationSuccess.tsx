import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

type Props = {
  trainerId: string;
  status: string;
  onBack?: () => void;
};

export default function TrainerRegistrationSuccess({ trainerId, status, onBack }: Props) {
  const navigate = useNavigate();
  const normalized = (status || "pending").toLowerCase();

  const isPending = normalized === "pending";

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-3">
          {isPending ? (
            <Clock className="h-10 w-10 text-muted-foreground" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-primary" />
          )}
        </div>
        <CardTitle className="text-2xl">
          {isPending ? "Application Submitted" : "Registration Complete"}
        </CardTitle>
        <div className="mt-2">
          <Badge variant={isPending ? "secondary" : "default"} className="capitalize">
            {normalized}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending ? (
          <p className="text-muted-foreground">
            Your trainer profile is <strong>pending approval</strong>. Once an admin verifies it, it will
            appear in the Trainers section.
          </p>
        ) : (
          <p className="text-muted-foreground">Your trainer profile is live and visible to users.</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate("/my-trainer-profile")} className="flex-1">
            View My Profile
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/trainers?refresh=${Date.now()}`)}
            className="flex-1"
          >
            Go to Trainers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Application ID: <span className="font-mono">{trainerId}</span>
        </div>

        {onBack && (
          <div className="pt-2">
            <Button variant="ghost" onClick={onBack}>
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
