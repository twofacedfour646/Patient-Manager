package user

import (
	"database/sql"
	"log"

	"github.com/twofacedfour646/patient-manager/types"
)

type Store struct {
	db *sql.DB
}

func NewUserStore(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

// Method for creating a new user
func (s *Store) CreateNewUser(newUserData types.RegisterPayload, hashedPassword []byte) error {
	// Query for inserting a new user into the table
	sql := `INSERT INTO users (
		fullName,
		username,
		email,
		phoneNumber,
		sex,
		dateOfBirth,
		address,
		occupation,
		emergencyContactName,
		emergencyContactPhone,
		primaryCarePhysician,
		insuranceProvider,
		insuranceNumber,
		allergies,
		currentMedications,
		familyHealthHistory,
		pastHealthHistory,
		isDoctor,
		password
	) VALUES(
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
		?,
	 	?,
		?,
		?,
		?,
		?,
		?
	);`

	// Execute query
	row := s.db.QueryRow(sql,
		newUserData.FullName,
		newUserData.Username,
		newUserData.Email,
		newUserData.PhoneNumber,
		newUserData.Sex,
		newUserData.DateOfBirth,
		newUserData.Address,
		newUserData.Occupation,
		newUserData.EmergencyContactName,
		newUserData.EmergencyContactPhone,
		newUserData.PrimaryCarePhysician,
		newUserData.InsuranceProvider,
		newUserData.InsuranceNumber,
		newUserData.Allergies,
		newUserData.CurrentMedications,
		newUserData.FamilyHealthHistory,
		newUserData.PastHealthHistory,
		false,
		string(hashedPassword),
	)

	if row.Err() != nil {
		return row.Err()
	}

	return nil
}

// Get one user by username
func (s *Store) GetUserByUsername(username string) (types.User, error) {
	// Get user Query
	sql := "SELECT * FROM users WHERE username=?;"

	// Make the query
	row := s.db.QueryRow(sql, username)

	// Check if no user is found
	var user types.User
	row.Scan(
		&user.Id,
		&user.FullName,
		&user.Username,
		&user.Email,
		&user.PhoneNumber,
		&user.Sex,
		&user.DateOfBirth,
		&user.Address,
		&user.Occupation,
		&user.EmergencyContactName,
		&user.EmergencyContactPhone,
		&user.PrimaryCarePhysician,
		&user.InsuranceProvider,
		&user.InsuranceNumber,
		&user.Allergies,
		&user.CurrentMedications,
		&user.FamilyHealthHistory,
		&user.PastHealthHistory,
		&user.IsDoctor,
		&user.Password,
	)

	return user, nil
}

func (s *Store) GetAllUsers() ([]types.User, error) {
	// Sql query to get all users
	sqlQuery := "SELECT * FROM users;"

	// User slice to hold returned rows
	var users []types.User

	// Call query
	rows, err := s.db.Query(sqlQuery)
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	for rows.Next() {
		var user types.User
		if err := rows.Scan(
			&user.Id,
			&user.Username,
			&user.Email,
			&user.Password,
		); err != nil {
			return users, err
		}

		users = append(users, user)
	}

	return users, nil
}
