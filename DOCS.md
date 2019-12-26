# hetea v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Contract](#contract)
	- [Create contract](#create-contract)
	- [Delete contract](#delete-contract)
	- [Retrieve contract](#retrieve-contract)
	- [Retrieve contracts](#retrieve-contracts)
	- [Update contract](#update-contract)
	
- [Message](#message)
	- [Create message](#create-message)
	- [Retrieve message](#retrieve-message)
	- [Retrieve messages](#retrieve-messages)
	- [Update message](#update-message)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Tutee](#tutee)
	- [Create tutee](#create-tutee)
	- [Delete tutee](#delete-tutee)
	- [Retrieve current tutee](#retrieve-current-tutee)
	- [Retrieve tutee](#retrieve-tutee)
	- [Retrieve tutees](#retrieve-tutees)
	- [Update tutee](#update-tutee)
	
- [Tutor](#tutor)
	- [Create tutor](#create-tutor)
	- [Delete tutor](#delete-tutor)
	- [Retrieve current tutor](#retrieve-current-tutor)
	- [Retrieve tutor](#retrieve-tutor)
	- [Retrieve tutors](#retrieve-tutors)
	- [Update tutor](#update-tutor)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Contract

## Create contract



	POST /contracts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| tutor			| String			|  <p>Contract's tutor.</p>							|
| tutee			| String			|  <p>Contract's tutee.</p>							|
| hours			| Number			| **optional** <p>Contract's hours.</p>							|
| price			| Number			| **optional** <p>Contract's price.</p>							|
| startDate			| Date			| **optional** <p>Contract's startDate.</p>							|
| endDate			| Date			| **optional** <p>Contract's endDate.</p>							|
| status			| String			| **optional** <p>Contract's status.</p>							|

## Delete contract



	DELETE /contracts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve contract



	GET /contracts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve contracts



	GET /contracts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update contract



	PUT /contracts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| tutor			| String			|  <p>Contract's tutor.</p>							|
| tutee			| String			|  <p>Contract's tutee.</p>							|
| hours			| Number			| **optional** <p>Contract's hours.</p>							|
| price			| Number			| **optional** <p>Contract's price.</p>							|
| startDate			| Date			| **optional** <p>Contract's startDate.</p>							|
| endDate			| Date			| **optional** <p>Contract's endDate.</p>							|
| status			| String			| **optional** <p>Contract's status.</p>							|

# Message

## Create message



	POST /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| receiver			| User			|  <p>Message's receiver.</p>							|
| content			| String			|  <p>Message's content.</p>							|

## Retrieve message



	GET /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve messages



	GET /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update message



	PUT /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| status			| String			|  <p>Message's status.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Tutee

## Create tutee



	POST /tutees


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| user_id			| 			|  <p>Tutee's user_id.</p>							|
| address			| 			|  <p>Tutee's address.</p>							|

## Delete tutee



	DELETE /tutees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve current tutee



	GET /tutees/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve tutee



	GET /tutees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve tutees



	GET /tutees


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update tutee



	PUT /tutees/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| user_id			| 			|  <p>Tutee's user_id.</p>							|
| address			| 			|  <p>Tutee's address.</p>							|

# Tutor

## Create tutor



	POST /tutors


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| user_id			| String			|  <p>Tutor's user_id.</p>							|
| address			| String			| **optional** <p>Tutor's address.</p>							|
| bio			| String			| **optional** <p>Tutor's bio.</p>							|
| skills			| String[]			| **optional** <p>Tutor's skills.</p>							|
| pricePerHour			| Number			| **optional** <p>Tutor's pricePerHour.</p>							|
| tagline			| String			| **optional** <p>Tutor's tagline.</p>							|
| rating			| Number			| **optional** <p>Tutor's rating.</p>							|
| taughtContract			| String[]			| **optional** <p>Tutor's taughtContract.</p>							|

## Delete tutor



	DELETE /tutors/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve current tutor



	GET /tutors/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| user_id			| String			|  <p>Tutor's user_id.</p>							|

## Retrieve tutor



	GET /tutors/:id


## Retrieve tutors



	GET /tutors


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update tutor



	PUT /tutors/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| user_id			| String			|  <p>Tutor's user_id.</p>							|
| address			| String			| **optional** <p>Tutor's address.</p>							|
| bio			| String			| **optional** <p>Tutor's bio.</p>							|
| skills			| String[]			| **optional** <p>Tutor's skills.</p>							|
| pricePerHour			| Number			| **optional** <p>Tutor's pricePerHour.</p>							|
| tagline			| String			| **optional** <p>Tutor's tagline.</p>							|
| rating			| Number			| **optional** <p>Tutor's rating.</p>							|
| taughtContract			| String[]			| **optional** <p>Tutor's taughtContract.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| type			| String			|  <p>User's type.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


