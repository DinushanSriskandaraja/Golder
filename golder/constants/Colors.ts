export const Colors = {
  light: {
    text: "#0D0D0D", // Near black for readability
    background: "#F2E0BD", // Brand color as the light background
    card: "#ECF2D8", // Light cream for subtle contrast
    textSecondary: "rgba(13, 13, 13, 0.7)", // 70% opacity of #0D0D0D
    button: "#437320", // Deep green for buttons
    buttonText: "#F2E0BD", // Brand color for button text contrast
    ctaCard: "#F2EDD0", // Slightly different beige for CTA card
    overlay: "rgba(13, 13, 13, 0.3)", // 30% opacity of #0D0D0D
    highlight: "rgba(242, 224, 189, 0.3)", // 30% opacity of #F2E0BD (brand highlight)
    success: "#4A8C6D", // Teal-green for "Bought" (credit success)
    error: "#1B594E", // Dark teal for "Withdrawn" (debit/error)
    warning: "#437320", // Deep green for "Withdrew" (past action)
    pending: "#254027", // Dark greenish-teal for "Pending Approval"
  },
  dark: {
    text: "#F2E0BD", // Brand color as primary text in dark mode
    background: "#254027", // Dark greenish-teal for background
    card: "#1B594E", // Dark teal for card background
    textSecondary: "rgba(242, 224, 189, 0.7)", // 70% opacity of #F2E0BD
    button: "#F2E0BD", // Brand color for buttons
    buttonText: "#0D0D0D", // Near black for button text contrast
    ctaCard: "#437320", // Deep green for CTA card
    overlay: "rgba(242, 224, 189, 0.3)", // 30% opacity of #F2E0BD (brand overlay)
    highlight: "rgba(242, 224, 189, 0.3)", // 30% opacity of #F2E0BD (brand highlight)
    success: "#4A8C6D", // Teal-green for "Bought" (credit success)
    error: "#1B594E", // Dark teal for "Withdrawn" (debit/error)
    warning: "#437320", // Deep green for "Withdrew" (past action)
    pending: "#ECF2D8", // Light cream for "Pending Approval" (contrast in dark mode)
  },
};