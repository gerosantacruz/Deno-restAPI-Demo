import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [{
  id: "3",
  name: "joe doe",
}];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Get user request successfully",
    users,
  };
};

export const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
    const userFound = users.find((user) => user.id === params.id)
    if(userFound){
        response.status = 200
        response.body = {
            message:"The result of the seardch",
            userFound
        }
    } else {
        response.status =404
        response.body = {
            message: "User do not found"
        }
    }
};


export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "The body is empy",
    };
  } else {
    console.log(body);
    const newUser: User = body.value;
    newUser.id = v4.generate();
    users.push(newUser);
    response.status = 200;

    response.body = {
      message: `the user ${newUser.name} have been created`,
      newUser,
    };
  }
};

export const updateUser = async ({response, request,params}: {response:Response, request:Request, params:{id:string}}) => {
  const userFound = users.find(user => user.id === params.id);
  if(!userFound){
    response.status = 404
    response.body = {
      message:"The user was not found"
    }
  } else {
    const body = await request.body();
    const upUser = body.value;

    users = users.map((user)=> user.id === params.id ? {...user, ...upUser}:user);

    response.status = 200
    response.body = {
      users
    }
  }
};

export const deleteUser = ({params, response}: {params:{id:string}, response:Response}) => {
    users = users.filter(user => params.id !== user.id)
    
        response.status = 200;
        response.body = {
            message:"The user have been deleted succesfully",
            users
        }
    
};
