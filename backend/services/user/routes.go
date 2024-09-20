package user

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/twofacedfour646/patient-manager/types"
	"github.com/twofacedfour646/patient-manager/utils"
	"golang.org/x/crypto/bcrypt"
)

type Handler struct {
	store *Store
}

func NewUserHandler(store *Store) *Handler {
	return &Handler{
		store: store,
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/login", h.handleLogin).Methods("POST", "OPTIONS")
	router.HandleFunc("/register", h.handleRegister).Methods("POST", "OPTIONS")
}

func (h *Handler) handleRegister(w http.ResponseWriter, r *http.Request) {
	// Get register data payload
	var payload types.RegisterPayload
	if err := utils.ParseJson(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// TODO Validate data
	// validateData(payload)

	// Check if user already exists
	existingUser, err := h.store.GetUserByUsername(payload.Username)
	if err != nil {
		log.Fatal(err)
	}

	if existingUser.Id != 0 {
		utils.WriteJson(w, http.StatusBadRequest, "user already exists")
		return
	}

	// Check if passwords match
	if payload.Password != payload.ConfirmPassword {
		utils.WriteJson(w, http.StatusBadRequest, "passwords do not match")
		return
	}

	// Generate hashed password to save
	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
	if hashErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, hashErr)
		return
	}

	// Insert new user into database
	newUserErr := h.store.CreateNewUser(payload, hashedPassword)
	if newUserErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, newUserErr)
		return
	}

	// Log an error with authenticating user
}

func (h *Handler) handleLogin(w http.ResponseWriter, r *http.Request) {
	// Get login data
	var payload types.LoginPayload
	if err := utils.ParseJson(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// Get user by username
	existingUser, getUserErr := h.store.GetUserByUsername(payload.Username)
	if getUserErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, getUserErr)
		return
	}

	// Respond with error if user is not found
	if existingUser.Id == 0 {
		utils.WriteJson(w, http.StatusOK, map[string]bool{"new_user": true})
		return
	}

	// Check if passwords don't match
	passwordCompareErr := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(payload.Password))
	if passwordCompareErr != nil {
		// Send an error that passwords do not match
		utils.WriteError(w, http.StatusBadRequest, passwordCompareErr)
		return
	}

	// Generate jwt
	tokenString, tokenErr := generateJwt(existingUser)
	if tokenErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, tokenErr)
		return
	}

	// Send token to the client
	utils.WriteJson(w, http.StatusOK, map[string]string{"jwt": tokenString})
}
