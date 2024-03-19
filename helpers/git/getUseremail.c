#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BUFFER_SIZE 1024

int get_user_name(char *email, size_t email_size) {
  FILE *fp;
  char buffer[MAX_BUFFER_SIZE];
  char *user_email = NULL;

  // Open pipe for reading output of "git config --list"
  fp = popen("git config --list", "r");
  if (fp == NULL) {
    fprintf(stderr, "Error: Failed to open pipe for git config\n");
    return -1;
  }

  // Read data from pipe into buffer
  while (fgets(buffer, MAX_BUFFER_SIZE, fp) != NULL) {
    // Check for "user.email=" line
    if (strncmp(buffer, "user.email=", 11) == 0) {
      user_email = buffer + 11; // Extract email after "user.email="

      // Truncate email if it exceeds email_size (null-terminate)
      user_email[strcspn(user_email, "\n")] = '\0';

      // Check if enough space in email buffer
      if (strlen(user_email) >= email_size) {
        fprintf(stderr, "Error: Email buffer too small\n");
        pclose(fp);
        return -1;
      }

      // Copy email to provided buffer
      strncpy(email, user_email, email_size);
      email[email_size - 1] = '\0'; // Ensure null termination

      break; // Found email, stop reading
    }
  }

  // Close pipe and check for errors
  int close_status = pclose(fp);
  if (close_status == -1 || user_email == NULL) {
    fprintf(stderr, "Error: Failed to retrieve Git user email\n");
    return -1;
  }

  return 0; // Success
}
