/* ==========================================================================
   PSG POLYTECHNIC COLLEGE - STUDENT RECORD SYSTEM SCRIPT
   ========================================================================== */

// Sample Database of Student Records
const studentDatabase = {
  "25CH07": {
    name: "Jyothiprabha V.H.",
    rollNo: "25CH07",
    dob: "10.01.2008",
    religion: "Hindu",
    blood: "O +ve",
    community: "BC",
    disabled: "No",
    emis: "2012860630",
    course: "Diploma",
    branch: "CHDH",
    period: "2025-27",
    fatherName: "VIJAYAKUMAR",
    motherName: "KRISHNA PRIVAY",
    fatherMobile: "9865911633",
    motherMobile: "9578808816",
    stuMobile: "8122359816",
    income: "Business and ₹ 2,48,000",
    address: "3/76 A, Narayana Naicken Pudur, Kattampatti (P.O), Kinathukadavu, Coimbatore. Pin: 642 202",
    bankBranch: "Indian Bank / Kattampatti",
    bankAccNo: "52776266",
    cgpa: "100",
    scholarType: "Day Scholar",
    scholarships: "Merit Scholarship",
    acadRemarks: "Excellent Performance",
    // Photos stored as dataURLs or defaults
    motherImg: "",
    fatherImg: "",
    studentImg: "",
    leavingImg: ""
  },
  "25EH08": {
    name: "Santhosh Kumar K.",
    rollNo: "25EH08",
    dob: "15.04.2007",
    religion: "Hindu",
    blood: "A +ve",
    community: "MBC",
    disabled: "No",
    emis: "2012860631",
    course: "Diploma",
    branch: "DGN (Computer Networking)",
    period: "2025-27",
    fatherName: "KUMARAVEL M.",
    motherName: "SARASWATHI K.",
    fatherMobile: "9842211005",
    motherMobile: "9787722334",
    stuMobile: "9047012345",
    income: "Agriculture and ₹ 1,80,000",
    address: "12/4, Main Road, Kinathukadavu, Coimbatore. Pin: 642 109",
    bankBranch: "Canara Bank / Kinathukadavu",
    bankAccNo: "442199081",
    cgpa: "9.10",
    scholarType: "Hosteller",
    scholarships: "BC Welfare Scholarship",
    acadRemarks: "Good Progress",
    motherImg: "",
    fatherImg: "",
    studentImg: "",
    leavingImg: ""
  },
  "25EH01": {
    name: "Abishek R.",
    rollNo: "25EH01",
    dob: "22.11.2007",
    religion: "Hindu",
    blood: "B +ve",
    community: "OC",
    disabled: "No",
    emis: "2012860632",
    course: "Diploma",
    branch: "DGN (Computer Networking)",
    period: "2025-27",
    fatherName: "RAMESH S.",
    motherName: "SUJATHA R.",
    fatherMobile: "9443388771",
    motherMobile: "9843155442",
    stuMobile: "8903344556",
    income: "Private Employee and ₹ 3,20,000",
    address: "45, VKK Menon Road, New Siddhapudur, Coimbatore. Pin: 641 044",
    bankBranch: "SBI / Gandhipuram",
    bankAccNo: "3099881122",
    cgpa: "9.62",
    scholarType: "Day Scholar",
    scholarships: "PSG Management Merit Award",
    acadRemarks: "Outstanding Academic & Tech Record",
    motherImg: "",
    fatherImg: "",
    studentImg: "",
    leavingImg: ""
  }
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  setupTabNavigation();
  setupRollSearch();
  loadSavedLocalStorage();
});

// Tab Navigation Logic
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPages = document.querySelectorAll(".tab-page");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabPages.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Dedicated Roll No Search Setup
function setupRollSearch() {
  const searchInput = document.getElementById("rollSearchInput");
  const searchBtn = document.getElementById("searchRollBtn");

  searchBtn.addEventListener("click", () => {
    executeRollSearch(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      executeRollSearch(searchInput.value);
    }
  });
}

// Execute Roll Search Function
function executeRollSearch(rollInput) {
  const roll = rollInput.trim().toUpperCase();
  if (!roll) {
    showToast("Please enter a valid Roll Number", "warning");
    return;
  }

  if (studentDatabase[roll]) {
    populateStudentData(studentDatabase[roll]);
    highlightActivePill(roll);
    showToast(`Loaded Record for Roll No: ${roll}`);
  } else {
    // Create new template record for unlisted Roll No
    const newRecord = createDefaultRecord(roll);
    studentDatabase[roll] = newRecord;
    populateStudentData(newRecord);
    showToast(`Created new profile template for Roll No: ${roll}`);
  }
}

// Quick Pill Load
function quickLoadRecord(rollNo) {
  document.getElementById("rollSearchInput").value = rollNo;
  executeRollSearch(rollNo);
}

function highlightActivePill(rollNo) {
  const pills = document.querySelectorAll(".pill-btn");
  pills.forEach(p => {
    if (p.textContent.includes(rollNo)) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });
}

// Populate Data onto the Form Fields
function populateStudentData(data) {
  document.getElementById("stuName").value = data.name || "";
  document.getElementById("stuRoll").value = data.rollNo || "";
  document.getElementById("stuDob").value = data.dob || "";
  document.getElementById("stuReligion").value = data.religion || "";
  document.getElementById("stuBlood").value = data.blood || "";
  document.getElementById("stuCommunity").value = data.community || "";
  document.getElementById("stuDisabled").value = data.disabled || "";
  document.getElementById("stuEmis").value = data.emis || "";

  document.getElementById("dispCourse").textContent = data.course || "Diploma";
  document.getElementById("dispBranch").textContent = data.branch || "DCN";
  const admElem = document.getElementById("dispAdmissionType");
  if (admElem) admElem.textContent = data.admissionType || "LATERAL ENTRY";
  document.getElementById("dispPeriod").textContent = data.period || "2025-27";

  document.getElementById("stuFatherName").value = data.fatherName || "";
  document.getElementById("stuMotherName").value = data.motherName || "";
  document.getElementById("fatherMobile").value = data.fatherMobile || "";
  document.getElementById("motherMobile").value = data.motherMobile || "";
  document.getElementById("stuMobile").value = data.stuMobile || "";
  document.getElementById("parentIncome").value = data.income || "";
  document.getElementById("permAddress").value = data.address || "";
  document.getElementById("bankBranch").value = data.bankBranch || "";
  document.getElementById("bankAccNo").value = data.bankAccNo || "";

  document.getElementById("dispCgpa").value = data.cgpa || "";
  document.getElementById("dispScholarType").value = data.scholarType || "";
  document.getElementById("dispScholarships").value = data.scholarships || "";
  document.getElementById("dispAcadRemarks").value = data.acadRemarks || "";

  // Reset/Set Photos
  updatePhotoDisplay('motherImgPreview', 'motherPlaceholder', data.motherImg);
  updatePhotoDisplay('fatherImgPreview', 'fatherPlaceholder', data.fatherImg);
  updatePhotoDisplay('studentImgPreview', 'studentPlaceholder', data.studentImg);
  updatePhotoDisplay('leavingImgPreview', 'leavingPlaceholder', data.leavingImg);
}

// Helper to update photo previews
function updatePhotoDisplay(imgId, placeholderId, imgSrc) {
  const imgElem = document.getElementById(imgId);
  const placeholderElem = document.getElementById(placeholderId);

  if (imgSrc) {
    imgElem.src = imgSrc;
    imgElem.style.display = 'block';
    placeholderElem.style.display = 'none';
  } else {
    imgElem.src = '';
    imgElem.style.display = 'none';
    placeholderElem.style.display = 'flex';
  }
}

// Photo Upload Preview Handler (Enforces Strict Equal Frames)
function previewPhoto(event, imgId, placeholderId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgSrc = e.target.result;
    updatePhotoDisplay(imgId, placeholderId, imgSrc);
    
    // Save to current active roll record
    const activeRoll = document.getElementById("stuRoll").value;
    if (studentDatabase[activeRoll]) {
      if (imgId === 'motherImgPreview') studentDatabase[activeRoll].motherImg = imgSrc;
      if (imgId === 'fatherImgPreview') studentDatabase[activeRoll].fatherImg = imgSrc;
      if (imgId === 'studentImgPreview') studentDatabase[activeRoll].studentImg = imgSrc;
      if (imgId === 'leavingImgPreview') studentDatabase[activeRoll].leavingImg = imgSrc;
    }
    
    showToast("Photo updated in equal size frame!");
  };
  reader.readAsDataURL(file);
}

// Default Record Generator
function createDefaultRecord(rollNo) {
  return {
    name: "Student Name",
    rollNo: rollNo,
    dob: "01.01.2008",
    religion: "Hindu",
    blood: "O +ve",
    community: "BC",
    disabled: "No",
    emis: "2012860999",
    course: "Diploma",
    branch: "DGN (Computer Networking)",
    period: "2025-27",
    fatherName: "Father Name",
    motherName: "Mother Name",
    fatherMobile: "9876543210",
    motherMobile: "9876543211",
    stuMobile: "9876543212",
    income: "Self Employed ₹ 2,00,000",
    address: "Coimbatore, Tamil Nadu",
    bankBranch: "Indian Bank / Coimbatore",
    bankAccNo: "1234567890",
    cgpa: "9.0",
    scholarType: "Day Scholar",
    scholarships: "Nil",
    acadRemarks: "Good",
    motherImg: "",
    fatherImg: "",
    studentImg: "",
    leavingImg: ""
  };
}

// Save Record Data Local Storage
function saveRecordData() {
  const currentRoll = document.getElementById("stuRoll").value;
  if (!currentRoll) {
    showToast("No Roll Number specified to save!", "error");
    return;
  }

  const updatedData = {
    name: document.getElementById("stuName").value,
    rollNo: currentRoll,
    dob: document.getElementById("stuDob").value,
    religion: document.getElementById("stuReligion").value,
    blood: document.getElementById("stuBlood").value,
    community: document.getElementById("stuCommunity").value,
    disabled: document.getElementById("stuDisabled").value,
    emis: document.getElementById("stuEmis").value,
    course: document.getElementById("dispCourse").textContent,
    branch: document.getElementById("dispBranch").textContent,
    period: document.getElementById("dispPeriod").textContent,
    fatherName: document.getElementById("stuFatherName").value,
    motherName: document.getElementById("stuMotherName").value,
    fatherMobile: document.getElementById("fatherMobile").value,
    motherMobile: document.getElementById("motherMobile").value,
    stuMobile: document.getElementById("stuMobile").value,
    income: document.getElementById("parentIncome").value,
    address: document.getElementById("permAddress").value,
    bankBranch: document.getElementById("bankBranch").value,
    bankAccNo: document.getElementById("bankAccNo").value,
    cgpa: document.getElementById("dispCgpa").value,
    scholarType: document.getElementById("dispScholarType").value,
    scholarships: document.getElementById("dispScholarships").value,
    acadRemarks: document.getElementById("dispAcadRemarks").value,
    motherImg: document.getElementById("motherImgPreview").src || "",
    fatherImg: document.getElementById("fatherImgPreview").src || "",
    studentImg: document.getElementById("studentImgPreview").src || "",
    leavingImg: document.getElementById("leavingImgPreview").src || ""
  };

  studentDatabase[currentRoll] = updatedData;
  localStorage.setItem("psg_student_records", JSON.stringify(studentDatabase));
  showToast(`Record for ${currentRoll} saved successfully!`);
}

// Load from LocalStorage
function loadSavedLocalStorage() {
  const saved = localStorage.getItem("psg_student_records");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(studentDatabase, parsed);
    } catch(e) {
      console.error("Failed to load saved records", e);
    }
  }
  // Initial load default
  populateStudentData(studentDatabase["25CH07"]);
}

// Toast Alert Helper
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  toastText.textContent = message;

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Medical Leave Application Handler
function addMedicalLeaveRecord() {
  const cause = document.getElementById("medCause").value.trim();
  const hospital = document.getElementById("medHospital").value.trim();
  const fromDate = document.getElementById("medFromDate").value;
  const toDate = document.getElementById("medToDate").value;
  const days = document.getElementById("medTotalDays").value;
  const cert = document.getElementById("medCertificate").value;

  if (!cause || !fromDate || !toDate) {
    showToast("Please enter Leave Cause, From Date, and To Date!");
    return;
  }

  const tableBody = document.querySelector("#medLeaveTable tbody");
  const newId = `ML-2026-${Math.floor(10 + Math.random() * 90)}`;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="center">${newId}</td>
    <td class="center">${fromDate}</td>
    <td class="center">${toDate}</td>
    <td class="center">${days}</td>
    <td>${cause}</td>
    <td>${hospital || "PSG Hospitals, Coimbatore"}</td>
    <td class="center" style="color:#10b981; font-weight:700;">${cert}</td>
    <td class="center"><span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:10px; font-weight:700;">APPROVED</span></td>
  `;

  tableBody.prepend(tr);
  showToast(`Medical Leave Application ${newId} submitted & approved!`);

  // Reset inputs
  document.getElementById("medCause").value = "";
  document.getElementById("medHospital").value = "";
  document.getElementById("medFromDate").value = "";
  document.getElementById("medToDate").value = "";
}

// Attendance Portal Sync Handler
function simulatePortalSync() {
  showToast("Connecting to PSGPTC Attendance Engine...");
  setTimeout(() => {
    showToast("Live Attendance & Medical Exemption data updated successfully!");
  }, 800);
}
