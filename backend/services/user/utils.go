package user

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/twofacedfour646/patient-manager/config"
)

type AccessClaims struct {
	UserID      int    `json:"userID"`
	FullName    string `json:"fullName"`
	Username    string `json:"username"`
	DateOfBirth string `json:"dateOfBirth"`
	jwt.RegisteredClaims
}

type RefreshClaims struct {
	UserID int `json:"userID"`
	jwt.RegisteredClaims
}

func generateAccessToken(userID int, fullName string, username string, dateOfBirth string) (string, error) {
	// Create new claims struct
	claims := AccessClaims{
		userID,
		fullName,
		username,
		dateOfBirth,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 15)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   fmt.Sprint(userID),
		},
	}

	// Create a new token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Format secret key
	secretKey := []byte(config.Envs.JWT_SECRET_KEY)

	// Stringify token
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func generateRefreshToken(userID int) (string, error) {
	// Create new claims struct
	claims := RefreshClaims{
		userID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   fmt.Sprint(userID),
		},
	}

	// Create a new token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

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
