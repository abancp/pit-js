#include <unistd.h>
#include <limits.h>

char* getCwd() {
  long path_max;

  // Get the maximum path length using pathconf
  path_max = pathconf("/", _PC_PATH_MAX);

  // Handle potential errors (e.g., pathconf failing)
  if (path_max == -1) {
    perror("pathconf");
  }


  // Allocate memory for the CWD buffer based on the maximum path length
  char cwd_buffer[path_max];

  // Get the current working directory
  char *cwd = getcwd(cwd_buffer, sizeof(cwd_buffer));

  if (cwd != NULL) {
    return cwd;
  } else {
    perror("getcwd");
  }

}