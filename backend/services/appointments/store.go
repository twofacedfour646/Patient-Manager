package appointments

import (
	"database/sql"

	"github.com/twofacedfour646/patient-manager/types"
)

type Store struct {
	db *sql.DB
}

func NewAppointmentStore(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

func (s *Store) CreateNewAppointment(payload types.CreateAppointmentPayload, userId interface{}) error {
	// Sql for inserting appointment into database
	insertNewAppointment := `INSERT INTO appointments(patientId, doctorId, status, date, reasonForAppointment, additionalComments) VALUES (?, ?, ?, ?, ?, ?);`

	// Make query
	row := s.db.QueryRow(insertNewAppointment, userId, payload.DoctorID, 0, payload.Date, payload.ReasonForAppointment, payload.AdditionalComments)
	if row.Err() != nil {
		return row.Err()
	}

	return nil
}

func (s *Store) UpdateAppointmentStatus(payload types.UpdateAppointmentPayload) error {
	// Sql for updating appointment
	updateAppointmentStatus := `UPDATE appointments SET status=? WHERE ID=?;`

	// Make query
	row := s.db.QueryRow(updateAppointmentStatus, payload.Status, payload.AppointmentID)
	if row.Err() != nil {
		return row.Err()
	}

	return nil
}
