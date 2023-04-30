export class SharedService
{
    public setUserName(userName:string)
    {
        localStorage.setItem("userName", userName);
    }
    public getUserName()
    {
        localStorage.getItem("userName");
    }
    public setUserId(userId:any)
    {
        localStorage.setItem("userId", userId);
    }
    public getUserId():any
    {
        return localStorage.getItem("userId");
    }
    public setName(name:any)
    {
        localStorage.setItem("name", name);
    }
    public getName():any
    {
        return localStorage.getItem("name");
    }
}