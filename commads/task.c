#include "../helpers/task/setTask.c"

int task(char *cwd, char *args[], int _w, int _c)
{
    char *command = args[2];
    switch (command[0])
    {
    case 'a':
    {
        if (strcmp(command, "add") == 0)
        {
            if (args[3])
            {
                set_task(args[3]);
            }else{
                printf("Error : Missing task name \n");
            }
        }else{
            printf("unknown command : %s",args[2]);
        }
        break;
    }
    default:
    {
        if (strlen(command) == 0)
        {
        }
    }
    }
}