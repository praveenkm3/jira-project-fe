import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetDesignationService } from "../hooks/auth.hooks";
import { toTitleCase } from "../algorithms/strings_operations";
import { useState } from "react";
import AddDesignationDialog from "../dialogs/AddDesignationDialog";

function Designations() {
  const { data: designations, isLoading } = useGetDesignationService();
  const [designationOpen, setDesignationOpen] = useState<boolean>(false);
  const handleAddDesignation = () => {
    setDesignationOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Designations
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDesignation}
        >
          Add Designation
        </Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : designations?.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {designations.map(
                (designation: {
                  designation_id: string;
                  designation_name: string;
                }) => (
                  <Box
                    key={designation.designation_id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    <Typography>
                      {toTitleCase(designation.designation_name)}
                    </Typography>
                  </Box>
                ),
              )}
            </Box>
          ) : (
            <Typography color="text.secondary">
              No designations found.
            </Typography>
          )}
        </CardContent>
      </Card>
      <AddDesignationDialog
        open={designationOpen}
        onClose={() => setDesignationOpen(false)}
      />
    </Box>
  );
}

export default Designations;
