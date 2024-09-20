package user

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/twofacedfour646/patient-manager/config"
	"github.com/twofacedfour646/patient-manager/types"
)

func generateJwt(userData types.User) (string, error) {
	// Create a new token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":                    userData.Id,
			"fullName":              userData.FullName,
			"username":              userData.Username,
			"email":                 userData.Email,
			"phoneNumber":           userData.PhoneNumber,
			"sex":                   userData.Sex,
			"dateOfBirth":           userData.DateOfBirth,
			"address":               userData.Address,
			"occupation":            userData.Occupation,
			"emergencyContactName":  userData.EmergencyContactName,
			"emergencyContactPhone": userData.EmergencyContactPhone,
			"primaryCarePhysician":  userData.PrimaryCarePhysician,
			"allergies":             userData.Allergies,
			"currentMedications":    userData.CurrentMedications,
			"familyHealthHistory":   userData.FamilyHealthHistory,
			"pastHealthHistory":     userData.PastHealthHistory,
			"isDoctor":              userData.IsDoctor,
			"exp":                   time.Now().Add(time.Hour * 24).Unix(),
		},
	)

	// Format secret key
	secretKey := []byte(config.Envs.JWT_SECRET_KEY)

	// Stringify token
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// func validateData(data any) {
// 	// Get struct values
// 	values := reflect.ValueOf(data)

// 	// Loop through the values
// 	for i := 0; i < values.NumField(); i++ {
// 		// Return error if a value is empty

// 	}
// }
