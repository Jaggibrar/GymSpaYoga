
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { insertSampleBusinesses, insertSampleTrainers } from "@/utils/sampleData";

const SampleDataButton = () => {
  const handleInsertSampleData = async () => {
    try {
      toast.info("Inserting sample data...");
      
      const businessResult = await insertSampleBusinesses();
      const trainerResult = await insertSampleTrainers();
      
      if (businessResult.success && trainerResult.success) {
        toast.success("Sample data inserted successfully! Refresh the page to see changes.");
      } else {
        toast.error("Failed to insert some sample data. Check console for details.");
      }
    } catch (error) {
      console.error("Error inserting sample data:", error);
      toast.error("Failed to insert sample data.");
    }
  };

  return (
    <Button 
      onClick={handleInsertSampleData}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 z-50"
    >
      Add Sample Data
    </Button>
  );
};

export default SampleDataButton;
