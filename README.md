# Indonesia Voter API

## Introduction

Welcome to the documentation for the Indonesia Voter API, a service that provides information about voters based on their identity number. This API is accessible at [indonesia-voter.membasuh.com](https://indonesia-voter.membasuh.com).

## Endpoint

`POST /`

1. Parameter
   - `identity_number` (string): The 16-digit identity number of the voter.
1. Example Request
   ```json
   {
     "meta": {
       "success": true,
       "code": 200,
       "message": "Identity number found",
       "errors": []
     },
     "data": {
       "full_name": "FULL NAME",
       "identity_number": "1333333333333337",
       "family_identity_number": "133337**********",
       "polling_station": {
         "name": "TPS 137",
         "number": "137",
         "regency_name": "CITY NAME",
         "district_name": "DISTRICT NAME",
         "village_name": "VILLAGE NAME",
         "address": "ADDRESS"
       }
     }
   }
   ```
1. Example Response
   ```json
   {
     "meta": {
       "success": false,
       "code": 500,
       "message": "TimeoutError: Waiting for element to be located By(css selector, .showMap)\nWait timed out after 5177ms",
       "errors": []
     },
     "data": null
   }
   ```

## Response Format

The API response is in JSON format and consists of two main sections

- `meta`
  - `success` (boolean): Indicates whether the request was successful.
  - `code` (integer): HTTP status code.
  - `message` (string): Descriptive message about the status of the request.
  - `errors` (array): List of errors (if any).
- `data`
  - `full_name` (string): Full name of the voter.
  - `identity_number` (string): The 16-digit identity number of the voter.
  - `family_identity_number` (string): Masked family identity number for privacy.
  - `polling_station` (object): Information about the voter's polling station.
    - `name` (string): Polling station name.
    - `number` (string): Polling station number.
    - `regency_name` (string): Regency name.
    - `district_name` (string): District name.
    - `village_name` (string): Village name.
    - `address` (string): Address of the polling station.

## Error Handling

If there are errors, they will be listed in the `errors` array within the `meta` section of the response. The `data` section will be `null` in case of an error.
Feel free to use this documentation to integrate the Indonesia Voter API into your project! If you have any questions or issues, please contact our support team.

## References

- [https://cekdptonline.kpu.go.id](https://cekdptonline.kpu.go.id)
- [https://github.com/gunantos/dpt-api](https://github.com/gunantos/dpt-api)
