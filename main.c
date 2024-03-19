#include <stdio.h>
#include <string.h>
#include "helpers/useges/printUsage.c"
#include "helpers/getCwd.c"
#include "commads/init.c"
#include "commads/task.c"

int main(int argc, char *argv[])

{

    char *cwd = getCwd();
    char *command = argv[1];

    switch (command[0])
    {
    case 'i':
        if (strcmp(command, "init") == 0)
        {
            init(cwd);
        }
        else
        {
            printf("Command: %s\n", command);
        }
        break;
    case 't':
        if (strcmp(command, "task") == 0)
        {
            task(cwd,argv,0,0);
        }
        else
        {
            printf("Command: %s\n", command);
        }
        break;
    default:
        printUsage();
        break;
    }

    return 0;
}
