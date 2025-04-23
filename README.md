# Project Name : School finder
Technology used: Node js + Sql +Drizzle orm
## Description
This project provides a basic API that handles school-related requests. The `GET` and `POST` requests are sent to the `Schools` endpoint, and currently, there is no differentiation between the two operations for listing and adding schools. Both `GET` and `POST` requests are processed through the same endpoint.

## Endpoints

### `/schools` (GET and POST)

- **GET**: Retrieves information about schools. This request will return a list of schools or specific school details based on the query parameters (if provided).
  
- **POST**: Adds a new school to the system. The request body must include the school data (e.g., name, address, etc.).

### Note:
Currently, there is no distinction between `GET` and `POST` actions. Both operations are handled under the `/schools` endpoint. In the future, the API might be enhanced to separate these actions into different endpoints such as `/listschool` for GET requests and `/addschool` for POST requests.

## Example Usage
