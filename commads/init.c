#include <sys/stat.h>
#include <stdlib.h>
int init(char *cwd)
{
    char *dir_path = strcat(strcat(cwd, "/"), ".pit");
    if (mkdir(dir_path, 0755) == 0)
    {
        char *tasks_path = strcat(dir_path, "/tasks");
        if (mkdir(tasks_path, 0755) == 0)
        {
            dir_path[strlen(dir_path) - 6] = '\0';
            char *devs_path = strcat(dir_path, "/devs");
            if (mkdir(devs_path, 0755) == 0)
            {
                printf("pit initialized empty reposetery\n");
                return 0;
            }
            else
            {
                perror("error when trying initializing reposetry\n");
                return 1;
            }
            free(devs_path);
        }
        else
        {
            perror("error when trying initializing reposetry\n");
            return 1;
        }
        free(tasks_path);
    }
    else
    {
        perror("error when trying initializing reposetry\n");
        return 1;
    }
    free(dir_path);
}
