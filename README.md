# Project Readme

This document details the tasks, implementations, and solutions performed in this project.

---

# Quick Summary:

- **Docker for MySQL Database Connection**:  
  I utilized Docker to establish a connection to a MySQL database.

- **Top 10 Most Frequently Ordered API**:  
  I implemented an API endpoint to retrieve the top 10 most frequently ordered items.

- **Caching for Efficiency**:  
  To ensure the API can handle millions of requests efficiently, I implemented caching mechanisms.

- **API Documentation with Swagger**:  
  I documented the API using Swagger, accessible at `/api`.

- **Optimized Get All Products API**:  
  I optimized and fixed the "Get All Products" API to work with or without filters.

- **Create Order API with Pushover Integration**:  
  I implemented the "Create Order" API and integrated it with the Pushover library for real-time notifications.

## Task 1: **Top 10 Most Ordered Products API**

### Steps Taken:

1. **SQL Query**:

   - Wrote a query to retrieve the top 10 most ordered products in a given area (assumed as the product's area).

2. **Repository Implementation**:

   - Added `findMostOrdered(area: string): Promise<any[]>` function in the `productRepository` to execute the query.

3. **Service Layer**:

   - Implemented a service function to call the repository:
     ```typescript
     async getMostOrderedProducts(area: string): Promise<ProductDTO[]> {
       return this.productsRepository.findMostOrdered(area);
     }
     ```

4. **Controller Endpoint**:

   - Added a route: `/product/mostOrdered?area="any-area"`.

5. **Caching Mechanism**:

   - Introduced NEST's in-memory cache-manager.
   - Tested caching by setting a TTL of 5 seconds and verified database hits occurred only once within that interval.

6. **Error Handling**:

   - Ensured all necessary error handling was implemented.

7. **Unit Testing**:

   - Verified correct behavior with two test cases:
     - Returns top products for a given area.
     - Throws an error if the area query is missing.

8. **API Documentation**:
   - Documented the API using Swagger.

---

## Task 2: **Fix and Optimize `/products` API**

### Problems Identified:

1. **Filtering by Categories**:

   - Incorrect use of `findOne` instead of `findMany`.
   - Always returned `this.prismaService.product.findMany()` regardless of filters, causing unnecessary database calls.

2. **Inconsistent Repository Usage**:

   - `productService` sometimes bypassed the repository and used `prismaService` directly.

3. **Missing Features**:

   - No pagination.
   - Filtering limited to categories (e.g., no filtering by name or area).

4. **Error Handling**:
   - Missing error handling for scenarios like product ID not found.

### Fixes Implemented:

1. **Query Optimization**:

   - Replaced the for-loop with `findMany` using a `where` clause for filtering by categories.

2. **Repository Enhancements**:

   - Added `findByCategories` function in `productRepository`.

3. **Service Improvements**:

   - Ensured `productService` adheres to the repository pattern.

4. **Enhanced Filtering**:

   - Added support for filtering by name and area.

5. **Pagination Support**:

   - Applied pagination to all queries.
   - Clients can specify `page` and `limit` via query parameters.

6. **Response DTO**:

   - Created `GetProductsResponseDTO` with metadata:
     - `total`, `page`, `limit`, `totalPages`.

7. **Metadata Calculation**:
   - Implemented metadata calculation in the `productRepository`.

---

## Bonus Task: **Create Order API**

### Implementation Details:

1. **DTOs**:

   - Created `CreateOrderDTO` and `OrderDTO`.

2. **Endpoint**:

   - Implemented `POST /order`.

3. **Request Body Example**:
   ```json
   {
     "customerId": 1,
     "items": [
       {
         "productId": 1,
         "quantity": 1
       }
     ]
   }
   ```
4. **Service Layer**

   - Validation of Products:
     - Implemented a function in `orderService` to validate the existence of each product in the request.
     - Handles scenarios where the `items` array is empty.
     - Throws appropriate errors if validation fails.

5. **Repository Layer**
   - Order Creation:
     - Created a `create` function in `orderRepository` to:
     - Save the order details in the database.
     - Associate order items with the order record.

## Notification Integration

- **Pushover Integration:**
  - Integrated the Pushover library to send mobile notifications upon successful order creation.
  - Example notification: `"New order has been created from customer {customer id}"`

---

## Potential improvements

1. Use Reddis for persistent caching
2. Add code comments to explain the code

## Packages added:

1. @nestjs/swagger
2. swagger-ui-express
3. class-transformer
4. node-pushover
5. @nestjs/testing upgraded from "^10.0.0" to "^10.4.15"
