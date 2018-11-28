# airbnb-clone-similar-listings-module

> Project description

## Related Projects

  - https://github.com/SDC-BedAndBreakfastClub/photos_module
  - https://github.com/SDC-BedAndBreakfastClub/Review_Module_By_Han_Linaung
  - https://github.com/SDC-BedAndBreakfastClub/airbnb-clone-booking-module
  - https://github.com/SDC-BedAndBreakfastClub/airbnb-clone-similar-listings-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

Set the following environment variables according to your PostgreSQL database:
> PGUSER
> PGDATABASE
> PGHOST
> PGPORT

From within the root directory:

> npm start

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node >=8.12.0
- etc

## Development

From within the root directory:

> npm run react-dev

### Installing Dependencies

From within the root directory:

> npm install

### API ROUTES

Direct a GET request to `/api/rooms/:listingId/similar_listings` to retrieve 12 listings similar to listing with `:listingId`

Direct a POST request to `/api/rooms/:listingId` with a payload of
{
  id: Number,
  images: [String],
  saved: Boolean,
  type: String,
  beds: String,
  title: String,
  price: Number,
  ratings: Number,
  average_rating: Number,
}
to add a new listing to the database

Direct a PATCH request to `/api/rooms/:listingId` with altered data to edit the information of the current listing

Direct a DELETE request to `/api/rooms/:listingId` to delete the current listing from the database