require('dotenv').config();
const express = require("express");
const cors = require("cors");

require("./DBconfig/dbconfig");
const DoctorRoutes = require("./Routes/DoctorRoutes");
const PatientRoutes = require("./Routes/PatientRoutes");
const treatemetrouitng = require("./Routes/TreatementRoutes");
const subtreatementrouting = require("./Routes/SubtreatementRoutes");
const appointmentrouting = require("./Routes/AppointmentRoutes");
const RegisteredadminRouting = require("./Routes/RegisteredAdminRoutes");
const hospitalRoutes = require("./Routes/HospitalRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", DoctorRoutes);
app.use("/", PatientRoutes);
app.use("/", treatemetrouitng);
app.use("/api", appointmentrouting);
app.use("/api", RegisteredadminRouting);// ✅ Subtreatments under /api
app.use("/api", subtreatementrouting); 
app.use("/api/hospital", hospitalRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


