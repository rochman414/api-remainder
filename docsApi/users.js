//schema swagger
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Bearer
 * 
 *  schemas:
 *      AddUsers:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password: 
 *                  type: string
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: username
 *              password: password
 * 
 *      ResponseAddUsers:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              username:
 *                  type: string    
 *              password: 
 *                  type: string
 *              createdAt:
 *                  type: timestamp     
 *              updatedAt:
 *                  type: timestamp
 *          example:
 *              status_code: 201
 *              message: Data berhasil di buat!
 *              data:
 *                  id: 2314214
 *                  username: username
 *                  password: password
 *                  updatedAt: 2021-12-31T04:26:52.955Z
 *                  createdAt: 2021-12-31T04:26:52.955Z
 * 
 *      GetDataUsers:
 *          type: object
 *          required: 
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: integer
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              createAt:
 *                  type: timestamp
 *              updatedAt:
 *                  type: timestamp
 *          example:
 *              status_code: 200
 *              data:
 *                  id: 31241
 *                  username: username
 *                  password: password
 *                  updatedAt: 2021-12-31T04:26:52.955Z
 *                  createdAt: 2021-12-31T04:26:52.955Z
 * 
 *      ResponseEditUsers:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: integer
 *              username: 
 *                  type: string
 *              password:
 *                  type: string
 *              updateAt:
 *                  type: timestamp
 *              createdAt:
 *                  type: timestamp
 *          example:
 *              status_code: 200
 *              message: data berhasil di update
 *              data:
 *                  id: 31241
 *                  username: username
 *                  password: password
 *                  updatedAt: 2021-12-31T04:26:52.955Z
 *                  createdAt: 2021-12-31T04:26:52.955Z
 *      DeleteUsers:
 *          type: object
 *          required: true
 *          properties:
 *              id: 
 *                  type: integer
 *          example: 
 *              status_code: 200
 *              message: Data berhasil di hapus!
 * 
 */
//end schema swagger

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User For All
 * 
 * /users/getdata:
 *  get:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Get Data Users
 *      tags: [ Users ]
 *      responses:
 *          200:
 *              description: response for users
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/GetDataUsers'
 * /users/add:
 *  post:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Add Data Users
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                       $ref: '#/components/schemas/AddUsers'
 *      responses:
 *          201:
 *              description: response for add users
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/ResponseAddUsers'
 * 
 * /users/edit/{id}:
 *  put:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Edit Data Users
 *      tags: [ Users ]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Id users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddUsers'
 *      responses:
 *          200:
 *              description: response edit successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseEditUsers'
 * 
 * /users/delete/{id}:
 *  delete:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Delete Data Users
 *      tags: [ Users ]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Users ID
 *      
 *      responses:
 *          200:
 *              description: Delete successfull
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DeleteUsers'
 */