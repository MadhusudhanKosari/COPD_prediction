document.addEventListener('DOMContentLoaded', function() {
    // Doctor data
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            rating: 4.7,
            reviews: 128
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            rating: 4.2,
            reviews: 95
        },
        {
            id: 3,
            name: "Dr. Priya Patel",
            specialty: "Pediatrician",
            rating: 5.0,
            reviews: 210
        }
    ];

    // DOM Elements
    const doctorCards = document.querySelectorAll('.doctor-card');
    const doctorSelectionSection = document.querySelector('.doctor-selection');
    const appointmentFormSection = document.querySelector('.appointment-form-container');
    const backBtn = document.querySelector('.back-btn');
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Selected doctor info
    let selectedDoctor = null;

    // Event Listeners
    doctorCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent triggering when clicking on child elements
            if (e.target.classList.contains('select-btn') || e.target.tagName === 'BUTTON') {
                const doctorId = parseInt(card.getAttribute('data-id'));
                selectedDoctor = doctors.find(doc => doc.id === doctorId);
                
                // Show appointment form and hide doctor selection
                doctorSelectionSection.style.display = 'none';
                appointmentFormSection.style.display = 'block';
                
                // Scroll to form
                appointmentFormSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    backBtn.addEventListener('click', function() {
        // Show doctor selection and hide appointment form
        doctorSelectionSection.style.display = 'block';
        appointmentFormSection.style.display = 'none';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(appointmentForm);
        const appointmentDate = new Date(formData.get('appointmentDate'));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = appointmentDate.toLocaleDateString('en-US', options);
        
        // Update confirmation modal with appointment details
        document.getElementById('confirmedDoctor').textContent = selectedDoctor.name;
        document.getElementById('confirmedDate').textContent = formattedDate;
        document.getElementById('confirmedTime').textContent = formData.get('appointmentTime').replace('-', 'to');
        
        // Show confirmation modal
        confirmationModal.style.display = 'flex';
        
        // Reset form (optional)
        // appointmentForm.reset();
    });

    closeModalBtn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    modalCloseBtn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        
        // Return to doctor selection
        doctorSelectionSection.style.display = 'block';
        appointmentFormSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset form
        appointmentForm.reset();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });

    // Set minimum date for appointment date picker (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', today);
});