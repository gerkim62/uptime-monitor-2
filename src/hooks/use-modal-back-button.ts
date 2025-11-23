import * as React from "react";

export function useModalBackButtonSupport(
  open: boolean | undefined,
  onOpenChange: ((open: boolean) => void) | undefined
) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const wasOpenRef = React.useRef(false);
  const closedViaBackButtonRef = React.useRef(false);

  const isOpen = open ?? internalOpen;
  const isControlled = open !== undefined;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      console.log(
        "[useModalBackButton] handleOpenChange called with:",
        newOpen
      );
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    console.log(
      "[useModalBackButton] isOpen:",
      isOpen,
      "wasOpenRef:",
      wasOpenRef.current
    );

    const handlePopState = () => {
      console.log("[useModalBackButton] Back button pressed - closing modal");
      window.history.pushState(null, "", window.location.href);
      closedViaBackButtonRef.current = true;
      handleOpenChange(false);
    };

    if (isOpen && !wasOpenRef.current) {
      console.log(
        "[useModalBackButton] Modal opening - neutralizing back button"
      );
      closedViaBackButtonRef.current = false;

      // Neutralize back button
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

      wasOpenRef.current = true;
    } else if (!isOpen && wasOpenRef.current) {
      console.log("[useModalBackButton] Modal closing");

      if (!closedViaBackButtonRef.current) {
        console.log(
          "[useModalBackButton] Closed programmatically - cleaning up history (simulating back button press)"
        );
        window.removeEventListener("popstate", handlePopState);
        console.log(
          "[useModalBackButton] refusing to clean up because it breaks linking to anywhere when modal is open (it cancels the link navigation while trying to cleanup and just doesnt work)"
        );
        // uncomment when above is solved, or find a way to fix this. (known bug)
        // window.history.back();
      } else {
        console.log(
          "[useModalBackButton] Closed via back button - just cleaning up handler"
        );
        window.removeEventListener("popstate", handlePopState);
      }

      wasOpenRef.current = false;
      closedViaBackButtonRef.current = false;
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, handleOpenChange]);

  return {
    open: isControlled ? open : internalOpen,
    onOpenChange: handleOpenChange,
  };
}
