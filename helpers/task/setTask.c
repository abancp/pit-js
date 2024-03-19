#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../git/getUseremail.c"

#define MAX_TASK_NAME_SIZE 128
#define MAX_EMAIL_SIZE 320
#define TASK_FILE_PATH ".pit/tasks/active"


int set_task(const char *task_name) {
  if (strlen(task_name) >= MAX_TASK_NAME_SIZE) {
    fprintf(stderr, "Error: Task name too long.\n");
    return -1;
  }

  char email[MAX_EMAIL_SIZE];
  if (get_user_name(email, sizeof(email)) != 0) {
    fprintf(stderr, "Error: Failed to get user email.\n");
    return -1;
  }

  char task_data[MAX_TASK_NAME_SIZE + MAX_EMAIL_SIZE + 3]; // Task name + "||" + email + newline
  snprintf(task_data, sizeof(task_data), "%s||%s\n", task_name, email);

  FILE *fp = fopen(TASK_FILE_PATH, "a"); // Open for appending
  if (fp == NULL) {
    fprintf(stderr, "Error: Failed to open task file.\n");
    return -1;
  }

  int bytes_written = fputs(task_data, fp);
  if (bytes_written < 0) {
    fprintf(stderr, "Error: Failed to write task data.\n");
    fclose(fp);
    return -1;
  }

  fclose(fp);
  printf("Task '%s' added successfully.\n", task_name);
  return 0;
}