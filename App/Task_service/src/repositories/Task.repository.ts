import { getPool } from "shared"




export async function createTask(input: {
    title: string.
    createdBy : string
}): Promise<Task> {
    const result = await getPool().query<Task>(
        `
          INSERT INTO tasks (title,create_by)
          VALUES($1 , $2)
          RETURNING id , title, status,create_by,create_at , update_at
        
        `,
        [input.title, input.createBy]
    )
    return result.rows[0]
}


/// for  user and admin function 


export async function listTickets(input: {
    userId: string,
    role: string
}): Promise<Task[]> {

    if (input.role === "ADMIN") {
        const result = await getPool().query<Task>(
            `
           SELECT id , title, status,create_by,create_at , update_at
           FROM tasks
           ORDER BY create_at=DESC
            
        `
        );
        return result.rows[0]
    }

    const result = await getPool().query<Task>(
        `
           SELECT id , title, status,create_by,create_at , update_at
           FROM tasks
           WHERE create_by = $1 
           ORDER BY create_at=DESC
            
           `,
        [input.userId]
    );
    return result.rows[0]

}



/// fetch singe task for both 


export async function findeSingleTaskByid()