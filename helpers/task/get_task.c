#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASK_LENGTH 128
#define MAX_TASKS_PER_FILE 256 // Adjust if needed

typedef struct
{
    char task[MAX_TASK_LENGTH];
} Task;

int read_tasks_from_file(const char *filename, Task *tasks, int *num_tasks)
{
    FILE *fp = fopen(filename, "r");
    if (fp == NULL)
    {
        return -1;
    }

    int i = 0;
    while (fgets(tasks[i].task, MAX_TASK_LENGTH, fp) != NULL && i < MAX_TASKS_PER_FILE)
    {
        // Remove trailing newline (if present)
        tasks[i].task[strcspn(tasks[i].task, "\n")] = '\0';
        i++;
    }

    *num_tasks = i;
    fclose(fp);
    return 0;
}

void print_tasks(const char *category, const Task *tasks, int num_tasks)
{
    if (num_tasks == 0)
    {
        printf("  - no %s tasks\n", category);
        return;
    }

    printf(" %s tasks:\n", category);
    for (int i = 0; i < num_tasks; i++)
    {
        printf("  - %s\n", tasks[i].task);
    }
}

int get_tasks(char *cwd, int print)
{
    Task tasks[MAX_TASKS_PER_FILE * 3]; // Allocate for all categories (active, working, closed)
    int num_tasks[3] = {0};             // Array to store number of tasks per category

    int result = 0;

    // Read active tasks
    result |= read_tasks_from_file(strcat(cwd,"/.pit/tasks/active"), tasks, &num_tasks[0]);

    // Read working tasks
    result |= read_tasks_from_file(strcat(cwd,"/.pit/tasks/working"), tasks + MAX_TASKS_PER_FILE, &num_tasks[1]);

    // Read closed tasks
    result |= read_tasks_from_file(strcat(cwd,"/.pit/tasks/closed"), tasks + 2 * MAX_TASKS_PER_FILE, &num_tasks[2]);

    if (result != 0)
    {
        fprintf(stderr, "Error reading tasks.\n");
        return -1;
    }

    if (print)
    {
        printf("\nTasks:\n");
        print_tasks("Active", tasks, num_tasks[0]);
        print_tasks("Working", tasks + MAX_TASKS_PER_FILE, num_tasks[1]);
        print_tasks("Closed", tasks + 2 * MAX_TASKS_PER_FILE, num_tasks[2]);
    }

    return 0;
}

int main()
{
    if (get_tasks("/home/aban/Desktop/Projects/pit",1) != 0)
    { // Print tasks by default
        return 1;
    }

    return 0;
}
