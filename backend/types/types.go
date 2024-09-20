package types

type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterPayload struct {
	FullName string `json:"fullName"`
	Username string `json:"username"`

	Email                 string `json:"email"`
	PhoneNumber           string `json:"phoneNumber"`
	Sex                   int    `json:"sex"`
	DateOfBirth           string `json:"dateOfBirth"`
	Address               string `json:"address"`
	Occupation            string `json:"occupation"`
	EmergencyContactName  string `json:"emergencyContactName"`
	EmergencyContactPhone string `json:"emergencyContactPhone"`

	PrimaryCarePhysician int    `json:"primaryCarePhysician"`
	InsuranceProvider    string `json:"insuranceProvider"`
	InsuranceNumber      string `json:"insuranceNumber"`
	Allergies            string `json:"allergies"`
	CurrentMedications   string `json:"currentMedications"`
	FamilyHealthHistory  string `json:"familyHealthHistory"`
	PastHealthHistory    string `json:"pastHealthHistory"`

	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type HttpResponse struct {
	Message string `json:"message"`
}

type User struct {
	Id       int    `json:"id"`
	FullName string `json:"fullName"`
	Username string `json:"username"`

	Email                 string `json:"email"`
	PhoneNumber           string `json:"phoneNumber"`
	Sex                   int    `json:"sex"`
	DateOfBirth           string `json:"dateOfBirth"`
	Address               string `json:"address"`
	Occupation            string `json:"occupation"`
	EmergencyContactName  string `json:"emergencyContactName"`
	EmergencyContactPhone string `json:"emergencyContactPhone"`

	PrimaryCarePhysician int    `json:"primaryCarePhysician"`
	InsuranceProvider    string `json:"insuranceProvider"`
	InsuranceNumber      string `json:"insuranceNumber"`
	Allergies            string `json:"allergies"`
	CurrentMedications   string `json:"currentMedications"`
	FamilyHealthHistory  string `json:"familyHealthHistory"`
	PastHealthHistory    string `json:"pastHealthHistory"`

	IsDoctor bool   `json:"isDoctor"`
	Password string `json:"password"`
}

type CreateAppointmentPayload struct {
	DoctorID             int    `json:"doctorID"`
	Date                 string `json:"date"`
	ReasonForAppointment string `json:"reasonForAppointment"`
	AdditionalComments   string `json:"additionalComments"`
}

type UpdateAppointmentPayload struct {
	AppointmentID int `json:"appointmentId"`
	Status        int `json:"status"`
}

type Appointment struct {
	Id                   int    `json:"id"`
	Patient              User   `json:"patient"`
	Doctor               User   `json:"doctor"`
	Status               int    `json:"status"`
	Date                 string `json:"date"`
	ReasonForAppointment string `json:"reasonForAppointment"`
	ReasonForCancelation string `json:"reasonForCancelation"`
	AdditionalComments   string `json:"additionalComments"`
}
