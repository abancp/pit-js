#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BUFFER_SIZE 1024

int get_user_name(char *user_name, size_t user_name_size) {
  FILE *fp;
  char buffer[MAX_BUFFER_SIZE];
  char *temp_user_name = NULL;

  // Open pipe for reading output of "git config --list"
  fp = popen("git config --list", "r");
  if (fp == NULL) {
    fprintf(stderr, "Error: Failed to open pipe for git config\n");
    return -1;
  }

  // Read data from pipe into buffer
  while (fgets(buffer, MAX_BUFFER_SIZE, fp) != NULL) {
    // Check for "user.name=" line
    if (strncmp(buffer, "user.name=", 10) == 0) {
      temp_user_name = buffer + 10; // Extract username after "user.name="
      // Truncate username if it exceeds user_name_size (null-terminate)
      temp_user_name[strcspn(temp_user_name, "\n")] = '\0';

      // Check if enough space in user_name buffer
      if (strlen(temp_user_name) >= user_name_size) {
        fprintf(stderr, "Error: Username buffer too small\n");
        pclose(fp);
        return -1;
      }

      // Copy username to provided buffer
      strncpy(user_name, temp_user_name, user_name_size);
      user_name[user_name_size - 1] = '\0'; // Ensure null termination

      break; // Found username, stop reading
    }
  }

  // Close pipe and check for errors
  int close_status = pclose(fp);
  if (close_status == -1 || temp_user_name == NULL) {
    fprintf(stderr, "Error: Failed to retrieve Git user name\n");
    return -1;
  }

  return 0; // Success
}

// int main() {
//   char user_name[128]; 

//   if (get_user_name(user_name, sizeof(user_name)) == 0) {
//     printf("Your Git user name: %s\n", user_name);
//   } else {
//     printf("Failed to get Git user name.\n");
//   }

//   return 0;
// }
