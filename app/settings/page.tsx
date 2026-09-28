"use client";

/**
 * Settings & Privacy — profile edit, export (JSON download), delete,
 * notification preferences (UI-only in v1), privacy + disclaimer.
 */

import * as React from "react";
import { Download, Trash2, RotateCcw, ShieldCheck } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Select, Checkbox,
} from "@/components/ui";
import { PageHeader, EmptyState, LoadingCards, DisclaimerLine } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import {
  exportAllData, deleteAllData, saveNotifications, loadNotifications,
  DEFAULT_NOTIFICATIONS, type NotificationPrefs,
} from "@/lib/storage";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { profile, save, resetToDemo, signOutToOnboarding, today } = useProfile();
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = React.useState(false);
  const [prefs, setPrefs] = React.useState<NotificationPrefs>(DEFAULT_NOTIFICATIONS);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
    setPrefs(loadNotifications());
  }, []);

  if (!ready) return <LoadingCards count={2} label="Loading settings" />;

  if (!profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Create your profile first — settings apply to it."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Privacy"
        subtitle="Your data lives only in this browser. Export it anytime; delete it whenever you want."
      />

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            aria-label="Edit profile"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const birthDate = String(fd.get("birthDate") ?? profile.birthDate);
              save({
                birthName: String(fd.get("birthName") ?? profile.birthName),
                preferredName: String(fd.get("preferredName") ?? ""),
                birthDate,
                birthTime: String(fd.get("birthTime") ?? ""),
                birthplace: String(fd.get("birthplace") ?? ""),
                system: (String(fd.get("system")) === "chaldean" ? "chaldean" : "pythagorean"),
              });
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-name">Birth name</Label>
                <Input id="s-name" name="birthName" defaultValue={profile.birthName} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="s-pref">Preferred name</Label>
                <Input id="s-pref" name="preferredName" defaultValue={profile.preferredName} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="s-date">Date of birth</Label>
                <Input id="s-date" name="birthDate" type="date" defaultValue={profile.birthDate} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="s-system">Numerology system</Label>
                <Select id="s-system" name="system" defaultValue={profile.system} className="mt-1">
                  <option value="pythagorean">Pythagorean</option>
                  <option value="chaldean">Chaldean (engine ready — readings still reflect Pythagorean in v1 UI)</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="s-time">
                  Birth time <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input id="s-time" name="birthTime" type="time" defaultValue={profile.birthTime} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="s-place">
                  Birthplace <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input id="s-place" name="birthplace" defaultValue={profile.birthplace} className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" size="sm">Save profile</Button>
              {saved ? <span role="status" className="text-xs text-muted-foreground">Saved ✓</span> : null}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => { resetToDemo(); window.location.reload(); }}
              >
                <RotateCcw aria-hidden /> Reset to demo profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="theme-select">Theme</Label>
            <Select
              id="theme-select"
              value={resolvedTheme ?? "system"}
              onChange={(e) => setTheme(e.target.value)}
              className="max-w-[220px]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">Match system</option>
            </Select>
            <span className="text-xs text-muted-foreground">Saved to this browser; follows your system by default.</span>
          </div>
        </CardContent>
      </Card>

      {/* Notification preferences (UI-only in v1) */}
      <Card>
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <p className="text-xs text-muted-foreground">
            v1 stores these preferences locally — no emails or push notifications are sent.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={prefs.dailyPrompt}
              onChange={(e) => {
                const next = { ...prefs, dailyPrompt: e.target.checked };
                setPrefs(next);
                saveNotifications(next);
              }}
            />
            Show me a daily reflection prompt on the Overview
          </label>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={prefs.cycleReminders}
              onChange={(e) => {
                const next = { ...prefs, cycleReminders: e.target.checked };
                setPrefs(next);
                saveNotifications(next);
              }}
            />
            Highlight new-cycle months (Personal Year / Month changes)
          </label>
          <div className="flex items-center gap-3 text-sm">
            <Label htmlFor="quiet">Preferred quiet hours</Label>
            <Input
              id="quiet"
              type="time"
              value={prefs.quietHours}
              onChange={(e) => {
                const next = { ...prefs, quietHours: e.target.value };
                setPrefs(next);
                saveNotifications(next);
              }}
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data controls */}
      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                const blob = new Blob([exportAllData()], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `anko-ki-maya-export-${today.toISOString().slice(0, 10)}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
            >
              <Download aria-hidden /> Export my data (JSON)
            </Button>
            {!confirmDelete ? (
              <Button variant="destructive" onClick={() => setConfirmDelete(true)}>
                <Trash2 aria-hidden /> Delete my data
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-2">
                <span className="text-sm">This permanently removes your profile, journal and milestones from this browser.</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    deleteAllData();
                    signOutToOnboarding();
                    window.location.href = "/";
                  }}
                >
                  Yes, delete everything
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Export includes your profile, journal entries, milestones and preferences. Nothing leaves your device unless you choose to share the file.
          </p>
        </CardContent>
      </Card>

      {/* Privacy + disclaimer */}
      <Card id="privacy">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck aria-hidden className="size-4 text-gold" /> Privacy &amp; disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">What we store:</span> your profile, journal entries,
            milestones and preferences — all in your browser&apos;s localStorage. No account, no server, no tracking, no paid APIs.
          </p>
          <p>
            <span className="font-medium text-foreground">What we never do:</span> sell or share data; send predictions
            about marriage, death, illness, money, pregnancy, crime or disasters; present interpretive numbers as fact.
          </p>
          <DisclaimerLine />
          <p className="text-xs">
            Consent first accepted: {new Date(profile.consentAcceptedAt).toLocaleDateString()} (update anytime by editing your profile).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}