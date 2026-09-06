




export type TaskStatus = "OPEN" | "IN_PROCRESS" | "RESOLVED" | "CLOSED";


export type Task = {
    id: string,
    title: string,
    status: TaskStatus,
    created_by: string,
    created_at: Date,
    update_at: Date

};
