package api

import (
	"database/sql"
	"net/http"
)

type APIServer struct {
	address string
	db      *sql.DB
}

func NewAPIServer(address string, db *sql.DB) *APIServer {
	return &APIServer{
		address: address,
		db:      db,
	}
}

func (s *APIServer) Run(router http.Handler) error {
	return http.ListenAndServe(s.address, router)
}
