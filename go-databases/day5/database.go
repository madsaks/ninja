package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"syreclabs.com/go/faker"
)

type UserRecord = struct {
	ID    string
	EMAIL string
}

type Store struct {
	db *sqlx.DB
}

type Server struct {
	Store *Store
}

func main() {
	//Initialise
	//------------------------------------------------------------------------------
	//I need to Understand how this works
	conn := dbConnect()
	store := &Store{
		db: conn,
	}
	server := &Server{
		Store: store,
	}
	//var s Server
	//Connect to localhost:5432:madimage
	//s.Store.dbConnect()
	//server.RunServer()
	//Routes
	//------------------------------------------------------------------

	//Create new router
	r := chi.NewRouter()

	//Middleware
	r.Use(middleware.Logger)

	//Handlers
	r.Get("/api/users", server.listUsersHandler)
	r.Get("/api/users/get", server.getUserHandler)

	//Start Http server
	//-------------------------------------------------------------------
	http.ListenAndServe(":3000", r)
	fmt.Println("HTTP Server started")

	// Generate 50 random emails
	//e := randomEmailGenerator(50)

	//Insert 50 random emails
	//for i := 0; i < len(e); i++ {
	//	db.insertEmail(e[i])
	//}

	//Print database users
	//db.printDbUsers()

}

func randomEmailGenerator(end int) []string {
	// faker.Internet().Email()
	//faker.Internet().FreeEmail()
	//faker.Internet().SafeEmail()

	var emails []string
	for i := 0; i < end; i++ {
		emails = append(emails, faker.Internet().Email())
		emails = append(emails, faker.Internet().FreeEmail())
		emails = append(emails, faker.Internet().SafeEmail())
	}
	return emails
}

//connect to database

func dbConnect() *sqlx.DB {
	// this Pings the database trying to connect, panics on error
	// use sqlx.Open() for sql.Open() semantics

	con, err := sqlx.Connect("postgres", "user=aaron dbname=madimage sslmode=disable password=newpa4s1")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Database connection successful")
	return con
}

//Insert Email into database
func (s Store) insertEmail(a string) {
	// Add email validation

	const email = `INSERT INTO users (email) VALUES ($1)`
	_, err := s.db.Exec(email, a)
	// Handle specific error
	if err != nil {
		if err.Error() == "pq: duplicate key value violates unique constraint \"users_email_key\"" {
			fmt.Println("Key already exists")
		}
	}
}

//Print user table
func (s Store) returnDbUsers() []*UserRecord {
	users := []*UserRecord{}
	err := s.db.Select(&users, "SELECT * FROM users")
	if err != nil {
		fmt.Println("Database Error\n %s", err)
	}
	fmt.Println("Users retrieved from database")
	return users

}
func (s *Server) listUsersHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("List all users handler called")
	users := s.Store.returnDbUsers()

	err := json.NewEncoder(w).Encode(users)
	if err != nil {
		fmt.Println("Error with Json Encoder\n%s", err)
		return
	}

}

func (s Server) getUserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get user handler called")
	userID := r.URL.Query().Get("id")
	user, err := s.Store.getUser(userID)
	if err != nil {
		return
	}
	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		fmt.Println("Error with Json Encoder\n%s", err)
		return
	}
}
func (s Store) getUser(id string) ([]*UserRecord, error) {
	var user []*UserRecord

	sql := "SELECT id, email FROM public.users WHERE id="
	sql = sql + id
	fmt.Println(sql)
	err := s.db.Select(&user, sql)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("User Record retrieved from database")
	return user, err

}
