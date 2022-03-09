/**
*@swagger
* components:
*   schemas:
*       Login:
*           type: object
*           required:
*               -username
*               -password   
*           properties:
*               username:
*                   type: string
*                   description: username for login
*               password:
*                   type: string
*                   description: password for login   
*           example:
*               username: username
*               password: password   
*       ResponseLogin:
*           type: object
*           required:
*               - status_code
*               - token
*           properties:
*               status_code:
*                   type: integer
*               token:
*                   type: string
*                   description: token user for login
*           example:
*               status_code: 200
*               token: dsalkafasdfakdjhfakjfhaskdfaksfdhakjdhsfaklshdflkhasdfkj
*/

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login link
 */


/**
 * @swagger
 *  /login/do_login:
 *   post:
 *      summary: This link for login
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: User was successfully login
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ResponseLogin'
 * 
 */
